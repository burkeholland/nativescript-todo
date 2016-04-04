var observable_1 = require('data/observable');
var observable_array_1 = require('data/observable-array');
var todos_service_1 = require('../services/todos-service');
var todo_1 = require('../models/todo');
var ViewModel = (function (_super) {
    __extends(ViewModel, _super);
    function ViewModel() {
        _super.call(this);
        // control visual state of items in the view, such as the bottom bar, the select all arrow
        // and the "items left" label
        this.hasItems = true;
        this.itemsLeft = 0;
        this.selectAll = false;
        // retrieve a collection of all todos from application settings (AKA local storage)
        // if there is no collection returned, an empty array is used
        this._allTodos = todos_service_1.default.get('todos');
        // initialize an observable array that the view will be bound to        
        this.todos = new observable_array_1.ObservableArray(this._allTodos);
        // calculate the number of items remaining to be completed
        this._itemsLeft();
        // determine if the collection contains any items
        this._hasItems();
        // determine the state of the "select all" arrow        
        this._selectAll();
    }
    ViewModel.prototype._itemsLeft = function () {
        var counter = 0;
        this._allTodos.forEach(function (todo) {
            if (!todo.completed) {
                counter++;
            }
        });
        this.set('itemsLeft', counter);
    };
    ViewModel.prototype._hasItems = function () {
        this.set('hasItems', this._allTodos.length > 0);
    };
    ViewModel.prototype._selectAll = function () {
        // if there are still todos, and all of them are marked completed, set selectAll to true.
        // this stops the select all arrow from being in the wrong state when all items are completed, but the list
        // has been completely cleared
        this.set('selectAll', this.hasItems && this.itemsLeft == 0);
    };
    ViewModel.prototype.add = function () {
        if (this.newTodo.trim().length > 0) {
            this._allTodos.push(new todo_1.default(this.newTodo.trim()));
            this.set('newTodo', '');
            this._refresh();
        }
    };
    ViewModel.prototype.remove = function (todo) {
        var index = this._allTodos.indexOf(todo);
        this._allTodos.splice(index, 1);
        this._refresh();
    };
    ViewModel.prototype.check = function (todo) {
        todo.set('completed', !todo.completed);
        this._refresh();
    };
    ViewModel.prototype.clearCompleted = function () {
        var activeTodos = this._allTodos.filter(function (thing, index) {
            return !thing.completed;
        });
        this._allTodos = activeTodos;
        this._refresh();
    };
    ViewModel.prototype.toggleSelectAll = function () {
        var _this = this;
        this._allTodos.forEach(function (todo) {
            todo.set('completed', !_this.selectAll);
        });
        this._refresh();
    };
    ViewModel.prototype.filter = function (filter) {
        // store the filter that was passed in. it may be null.
        this._filter = filter;
        // if a valid filter was passed in and not null or undefined
        if (filter) {
            // filter out the items in the array that match the filter condition        
            var filteredItems = this._allTodos.filter(function (item) {
                for (var key in filter) {
                    if (item[key] == filter[key]) {
                        return true;
                    }
                }
            });
            // splicing the todos collection empties it so that it can be repopulated with only
            // the filtered items
            this.todos.splice(0, this.todos.length);
            this.todos.push(filteredItems);
        }
        else {
            // clear the todos array and reset it to be the same as the _allTodos true collection
            this.todos.splice(0, this.todos.length);
            this.todos.push(this._allTodos);
        }
    };
    ViewModel.prototype._refresh = function () {
        // this method is called virtually every time something on the model changes. This is done
        // so that the true collection (_allTodos) and the filtered collection (todos) stay in sync.
        this.filter(this._filter);
        todos_service_1.default.set('todos', this._allTodos);
        // reset some of the visual state that requires computation
        this._hasItems();
        this._itemsLeft();
        this._selectAll();
    };
    return ViewModel;
})(observable_1.Observable);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ViewModel;
//# sourceMappingURL=todo-view-model.js.map