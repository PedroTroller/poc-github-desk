import dispatcher from './dispatcher.js';
import Storate from './storage.js';
import $ from 'jquery';
import QueryString from 'query-string';

let Client = function (identifier, secret) {
    this.identifier = identifier;
    this.secret = secret;
    this.storage = new Storate('access_token');
    this.token = null;

    this.connect = () => {
        if (this.storage.get()) {
            this.token = this.storage.get();

            dispatcher.dispatch('oauth.token', this.token);

            return;
        }

        let query = QueryString.parse(location.search);

        if (query.code) {
            window.history.pushState({}, '', '/');
            this.access(query.code);

            return;
        }

        let data = {
            client_id: this.identifier,
            redirect_uri: location.href,
            scope: 'notifications',
        };

        let url = 'http://github.com/login/oauth/authorize?' + QueryString.stringify(data);

        location.href = url;
    };

    this.access = (code) => {
        let data = {
            client_id: this.identifier,
            client_secret: this.secret,
            code: code,
            redirect_uri: location.href,
            scope: 'notifications',
        };

        $.get('http://github.com/login/oauth/access_token', data, (response) => {
            response = QueryString.parse(response);

            if (response.error) {
                dispatcher.dispatch('oauth.error', response);
            } else if (response.access_token) {
                dispatcher.dispatch('oauth.token', response);

                this.storage.set(response);
                this.token = response;
            }
        });
    };

    this.onToken = (fn) => {
        dispatcher.on('oauth.token', fn);
    };
};

export default new Client('c6f80378dc0e7d6e23c1', '8eb22f29e815782fe78585fb02fe110ae1012350');
