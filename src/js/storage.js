let Storage = function (name) {
    this.name = name;
    this.storage = window.localStorage;

    this.get = () => {
        return JSON.parse(this.storage.getItem(this.name));
    };

    this.set = (data) => {
        this.storage.setItem(this.name, JSON.stringify(data));
    };

    this.clear = () => {
        this.storage.removeItem(this.name);
    };
};

export default Storage;
