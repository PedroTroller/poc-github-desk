import OAuth from './oauth.js';
import $ from 'jquery';
import Rx from 'rxjs/Rx';

let interval = 60;
let since = null;
let action = Rx.Observable.defer(() => {
    let data = {};

    if (null !== since) {
        data.since = since.toISOString();
    }

    return $.ajax({
        url: 'https://api.github.com/notifications',
        data: data,
        headers: {
            Authorization: OAuth.token.token_type + ' ' + OAuth.token.access_token,
        },
        success: (data, status, request) => {
            since = new Date();
        }
    });
});

let timer = Rx.Observable.timer(0, interval * 1000);

let source = timer.switchMap(() => action);

export default source;
