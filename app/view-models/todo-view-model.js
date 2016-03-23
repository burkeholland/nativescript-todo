var observable_1 = require('data/observable');
var observable_array_1 = require('data/observable-array');
var todo_1 = require('../models/todo');
var data_source_1 = require('../shared/data-source');
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel(message) {
        var _this = this;
        _super.call(this);
        this.hasThings = true;
        this.itemsLeft = 0;
        this.barAll = true;
        this.barActive = false;
        this.barDone = false;
        this.selectAll = false;
        var todos = [
            new todo_1.default('Install NativeScript'),
            new todo_1.default('Copy Todo MVC Project'),
            new todo_1.default('Come Up With Fake Todo Items'),
            new todo_1.default('Debug In VS Code')
        ];
        this.todos = new data_source_1.default(todos, this);
        this.itemsLeft = this.todos.view.length;
        this.todos.on(observable_array_1.ObservableArray.changeEvent, function (args) {
            if (_this.todos.view.length > 0) {
                _this.set('hasThings', true);
            }
            else {
                _this.set('hasThings', false);
            }
        });
        this.set('todos', this.todos);
    }
    ViewModel.prototype.add = function () {
        this.todos.push(new todo_1.default(this.message));
        this.set('message', '');
        this.set('itemsLeft', this.itemsLeft + 1);
        this.set('selectAll', false);
    };
    ViewModel.prototype.remove = function (todo) {
        this.todos.remove(todo);
        this.set('itemsLeft', this.itemsLeft - 1);
    };
    ViewModel.prototype.check = function (todo) {
        if (todo.completed) {
            todo.set('completed', false);
            this.set('itemsLeft', this.itemsLeft--);
        }
        else {
            todo.set('completed', true);
            this.set('itemsLeft', this.itemsLeft++);
        }
        this.todos.set('completed', todo);
    };
    ViewModel.prototype.clearThenSetSelected = function (property) {
        this.set('barAll', false);
        this.set('barActive', false);
        this.set('barDone', false);
        this.set("bar" + property, true);
    };
    ViewModel.prototype.updateBar = function (arg) {
        this.clearThenSetSelected(arg);
    };
    ViewModel.prototype.toggleSelectAll = function () {
        var _this = this;
        this.set('selectAll', !this.selectAll);
        this.todos.data.forEach(function (todo) {
            _this.selectAll ? todo.set('completed', true) : todo.set('completed', false);
        });
        this.set('itemsLeft', !this.selectAll ? this.todos.data.length : 0);
    };
    ViewModel.prototype.clearCompleted = function () {
        var activeTodos = this.todos.data.filter(function (thing, index) {
            return !thing.completed;
        });
        this.todos.reset(activeTodos);
    };
    ViewModel.prototype.filter = function () {
    };
    return ViewModel;
})(observable_1.Observable);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewModel;
//# sourceMappingURL=todo-view-model.js.map