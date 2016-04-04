var ApplicationSettings = require('application-settings');
var todo_1 = require('../models/todo');
// A quick and wrapper for application-settings which already behaves very much like HTML5 LocalStorage
var TodosService = {
    get: function (key) {
        var value = ApplicationSettings.getString(key);
        var result = new Array();
        if (value) {
            var rawTodos = JSON.parse(value);
            // we need to convert these raw todos into observables
            rawTodos.forEach(function (todo) {
                result.push(new todo_1.default(todo.text));
            });
            return result;
        }
        else
            return [];
    },
    set: function (key, value) {
        ApplicationSettings.setString(key, JSON.stringify(value));
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TodosService;
//# sourceMappingURL=todos-service.js.map