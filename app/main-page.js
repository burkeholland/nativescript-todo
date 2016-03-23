var _this = this;
var todo_view_model_1 = require('./view-models/todo-view-model');
var todo_1 = require('./models/todo');
var viewModel = new todo_view_model_1.default('');
var pageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = viewModel;
};
exports.pageLoaded = pageLoaded;
var add = function (args) {
    viewModel.todos.push(new todo_1.default(_this.message));
    viewModel.set('message', '');
    viewModel.set('itemsLeft', _this.itemsLeft + 1);
    viewModel.set('selectAll', false);
};
var remove = function (args) {
    var v = args.object.parent.parent;
    var todo = args.object.bindingContext;
    v.animate({
        translate: { x: -10, y: 0 },
        curve: "easeIn",
        duration: 100
    })
        .then(function () {
        return v.animate({
            translate: { x: 1000, y: 0 },
            curve: "easeIn",
            duration: 500
        });
    })
        .then(function () {
        viewModel.remove(todo);
    });
};
exports.remove = remove;
var check = function (args) {
    var todo = args.object.bindingContext;
    viewModel.check(todo);
};
exports.check = check;
var filter = function (args) {
    var segementedbar = args.object;
    var segmentedBarItem = segementedbar.items[args.newIndex];
    switch (segmentedBarItem.rel) {
        case 'active': {
            viewModel.todos.filter({ completed: false });
            break;
        }
        case 'done': {
            viewModel.todos.filter({ completed: true });
            break;
        }
        default: {
            viewModel.todos.filter();
            break;
        }
    }
};
exports.filter = filter;
//# sourceMappingURL=main-page.js.map