var todo_view_model_1 = require('./view-models/todo-view-model');
var viewModel = new todo_view_model_1.default();
var pageLoaded = function (args) {
    var page = args.object;
    page.bindingContext = viewModel;
};
exports.pageLoaded = pageLoaded;
var add = function (args) {
    viewModel.add();
};
exports.add = add;
var remove = function (args) {
    // Just getting the todo from the binding context. 
    // This weird syntax is just casting objects to please the TypeScript compiler. 
    var todo = args.object.bindingContext;
    viewModel.remove(todo);
};
exports.remove = remove;
var check = function (args) {
    var todo = args.object.bindingContext;
    viewModel.check(todo);
};
exports.check = check;
var filter = function (args) {
    // The SegmentedBar emits one event, not a separate event for each button.
    // We need to find the element that was clicked by it's index
    var segementedbar = args.object;
    var segmentedBarItem = segementedbar.items[args.newIndex];
    // We have to use the "get" syntax to please the TypeScript compiler since there is no known "completed" property.
    var completedState = segmentedBarItem.get('completed');
    if (completedState == undefined) {
        viewModel.filter();
    }
    else {
        viewModel.filter({ completed: completedState });
    }
};
exports.filter = filter;
//# sourceMappingURL=main-page.js.map