var observable_1 = require('data/observable');
var Todo = (function (_super) {
    __extends(Todo, _super);
    function Todo(text) {
        _super.call(this);
        this.completed = false;
        this.id = new Date().getTime();
        this.text = text;
    }
    return Todo;
})(observable_1.Observable);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Todo;
//# sourceMappingURL=todo.js.map