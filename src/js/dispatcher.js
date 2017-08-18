let Dispatcher = function () {
    this.listeners = {};
};

Dispatcher.prototype.listen = function (eventName, handler) {
    if (undefined === this.listeners[eventName]) {
        this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(handler);

    return this;
};

Dispatcher.prototype.on = Dispatcher.prototype.listen;

Dispatcher.prototype.dispatch = function (eventName, data) {
    if (undefined === this.listeners[eventName]) {
        return this;
    }

    for (let i = 0; i < this.listeners[eventName].length; i++) {
        this.listeners[eventName][i](data);
    }

    return this;
};

Dispatcher.prototype.emit = Dispatcher.prototype.dispatch;

let instance = new Dispatcher();

export default instance;
