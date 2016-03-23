var observable_array_1 = require('data/observable-array');
var observable_1 = require('data/observable');
var DataSource = (function (_super) {
    __extends(DataSource, _super);
    function DataSource(items, parent) {
        _super.call(this);
        this.data = items;
        this.view = new observable_array_1.ObservableArray(items);
        this._parent = parent;
    }
    DataSource.prototype.filter = function (filter) {
        this._filter = filter;
        if (filter) {
            var filteredItems = this.data.filter(function (item) {
                for (var key in filter) {
                    if (item[key] == filter[key]) {
                        return true;
                    }
                }
            });
            this._refresh(filteredItems);
        }
        else {
            this._refresh(this.data);
        }
    };
    DataSource.prototype.reset = function (items) {
        this.data = items;
        this.filter(this._filter);
    };
    DataSource.prototype._refresh = function (items) {
        this.view.splice(0, this.view.length);
        this.view.push(items);
    };
    DataSource.prototype.push = function (item) {
        this.data.push(item);
        this.filter(this._filter);
    };
    DataSource.prototype.remove = function (item) {
        var index = this.data.indexOf(item);
        this.data.splice(index, 1);
        this.filter(this._filter);
    };
    DataSource.prototype.set = function (property, item) {
        this.filter(this._filter);
    };
    return DataSource;
})(observable_1.Observable);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataSource;
//# sourceMappingURL=data-source.js.map