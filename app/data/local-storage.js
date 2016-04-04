var ApplicationSettings = require('application-settings');
var LocalStorage = {
    get: function (key) {
        var value = ApplicationSettings.getString(key);
        if (value) {
            return JSON.parse(value);
        }
        else
            return false;
    },
    set: function (key, value) {
        ApplicationSettings.setString(key, JSON.stringify(value));
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LocalStorage;
//# sourceMappingURL=local-storage.js.map