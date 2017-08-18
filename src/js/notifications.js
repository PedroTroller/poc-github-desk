import api from './stream';
import Storage from './storage';
import Rx from 'rxjs/Rx';

let Collection = function () {
    this.storage = new Storage('notificationss');

    if (!this.storage.get()) {
        this.storage.set([]);
    }

    this.notifications = this.storage.get();

    this.buildStream = () => {
        return Rx
            .Observable
            .of(this.notifications)
            .concat(api)
            .mergeAll()
            .distinct((notification) => notification.id)
        ;
    };

    api.mergeAll().subscribe((notification) => {
        if (0 === this.notifications.filter((current) => current.id === notification.id).length) {
            this.notifications.push(notification);
            this.storage.set(this.notifications);
        }
    });
};

let instance = new Collection();

export default instance;
