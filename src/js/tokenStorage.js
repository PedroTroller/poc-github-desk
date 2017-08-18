let storage = {};

storage.get = function () {
    return window.localStorage.getItem('token');
};

storage.set = function (token) {
    window.localStorage.setItem('token', token);
};

storage.clear = function () {
    window.localStorage.removeItem('token');
};

export default storage;
