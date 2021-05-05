"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxProcessStore = void 0;
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var redux_1 = require("redux");
/**
 * A global store manager for redux. Allows the ability to dynamically add and remove "sub-stores" (ReduxProcessGroup)
 */
var ReduxProcessStore = /** @class */ (function () {
    /**
     * Create a new instance
     * @param middlewares optional array of additional middlewars to attach. Redux-thunk is already used
     */
    function ReduxProcessStore(middlewares) {
        if (middlewares === void 0) { middlewares = []; }
        this.processes = {};
        var middleware = redux_1.applyMiddleware.apply(void 0, __spreadArrays([redux_thunk_1.default], middlewares));
        this._internalReducer = this._internalReducer.bind(this);
        this.store = redux_1.createStore(this._internalReducer, middleware);
    }
    /**
     * Register a ReduxProcessGroup
     * @param  processGroup
     */
    ReduxProcessStore.prototype.addProcessGroup = function (processGroup) {
        if (this.errorHandler) {
            processGroup.setErrorHandler(this.errorHandler);
        }
        this.processes[processGroup.groupName] = processGroup.getReducer();
        this._updateReducer();
        return this;
    };
    /**
     * Remove a ReduxProcessGroup
     * @param  processGroup
     */
    ReduxProcessStore.prototype.removeProcessGroup = function (processGroup) {
        delete this.processes[processGroup.groupName];
        this._updateReducer();
        return this;
    };
    /**
     * Set an internal global error handler for actions when dispatched (should be set before calling `addProcessGroup`)
     * @param  cb
     */
    ReduxProcessStore.prototype.setErrorHandler = function (cb) {
        this.errorHandler = cb;
    };
    ReduxProcessStore.prototype._updateReducer = function () {
        var newReducer = redux_1.combineReducers(this.processes);
        this.store.replaceReducer(newReducer);
    };
    ReduxProcessStore.prototype._internalReducer = function (state) {
        if (state === void 0) { state = {}; }
        return state;
    };
    /**
     * Get the raw redux store
     */
    ReduxProcessStore.prototype.getStore = function () {
        return this.store;
    };
    return ReduxProcessStore;
}());
exports.ReduxProcessStore = ReduxProcessStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkdXhQcm9jZXNzU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkdXhQcm9jZXNzU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLDREQUErQjtBQUMvQiwrQkFNYztBQU1kOztHQUVHO0FBQ0g7SUFRRTs7O09BR0c7SUFDSCwyQkFBWSxXQUF1QjtRQUF2Qiw0QkFBQSxFQUFBLGdCQUF1QjtRQVZ6QixjQUFTLEdBR2YsRUFBRSxDQUFBO1FBUUosSUFBTSxVQUFVLEdBQUcsdUJBQWUsK0JBQUMscUJBQUssR0FBSyxXQUFXLEVBQUMsQ0FBQTtRQUN6RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN4RCxJQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRDs7O09BR0c7SUFDSCwyQ0FBZSxHQUFmLFVBQWdCLFlBQTBDO1FBQ3hELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtTQUNoRDtRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFlBQVksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNsRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDckIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsOENBQWtCLEdBQWxCLFVBQW1CLFlBQTBDO1FBQzNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3JCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVEOzs7T0FHRztJQUNILDJDQUFlLEdBQWYsVUFBZ0IsRUFBNkI7UUFDM0MsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUE7SUFDeEIsQ0FBQztJQUVELDBDQUFjLEdBQWQ7UUFDRSxJQUFNLFVBQVUsR0FBRyx1QkFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRUQsNENBQWdCLEdBQWhCLFVBQWlCLEtBQStCO1FBQS9CLHNCQUFBLEVBQUEsVUFBK0I7UUFDOUMsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxvQ0FBUSxHQUFSO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBQ25CLENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFoRUQsSUFnRUM7QUFoRVksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IHtcbiAgU3RvcmUsXG4gIGNyZWF0ZVN0b3JlLFxuICBhcHBseU1pZGRsZXdhcmUsXG4gIGNvbWJpbmVSZWR1Y2VycyxcbiAgUmVkdWNlclxufSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IElSZWR1eFByb2Nlc3NTdG9yZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JUmVkdXhQcm9jZXNzU3RvcmUnXG5pbXBvcnQgeyBJUmVkdXhQcm9jZXNzR3JvdXAgfSBmcm9tICcuL2ludGVyZmFjZXMvSVJlZHV4UHJvY2Vzc0dyb3VwJ1xuaW1wb3J0IHsgUmVkdXhQcm9jZXNzQWN0aW9uIH0gZnJvbSAnLi90eXBlcy9SZWR1eFByb2Nlc3MnXG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuL3R5cGVzL1JlZHV4UHJvY2Vzc0dyb3VwJ1xuXG4vKipcbiAqIEEgZ2xvYmFsIHN0b3JlIG1hbmFnZXIgZm9yIHJlZHV4LiBBbGxvd3MgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgYWRkIGFuZCByZW1vdmUgXCJzdWItc3RvcmVzXCIgKFJlZHV4UHJvY2Vzc0dyb3VwKVxuICovXG5leHBvcnQgY2xhc3MgUmVkdXhQcm9jZXNzU3RvcmU8R2xvYmFsU3RhdGU+IGltcGxlbWVudHMgSVJlZHV4UHJvY2Vzc1N0b3JlIHtcbiAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTxhbnksIFJlZHV4UHJvY2Vzc0FjdGlvbjxhbnk+PlxuICBwcm90ZWN0ZWQgcHJvY2Vzc2VzOiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIFJlZHVjZXI8YW55LCBSZWR1eFByb2Nlc3NBY3Rpb248YW55Pj5cbiAgPiA9IHt9XG4gIHByb3RlY3RlZCBlcnJvckhhbmRsZXI/OiBFcnJvckhhbmRsZXI8R2xvYmFsU3RhdGU+XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZVxuICAgKiBAcGFyYW0gbWlkZGxld2FyZXMgb3B0aW9uYWwgYXJyYXkgb2YgYWRkaXRpb25hbCBtaWRkbGV3YXJzIHRvIGF0dGFjaC4gUmVkdXgtdGh1bmsgaXMgYWxyZWFkeSB1c2VkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtaWRkbGV3YXJlczogYW55W10gPSBbXSkge1xuICAgIGNvbnN0IG1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUodGh1bmssIC4uLm1pZGRsZXdhcmVzKVxuICAgIHRoaXMuX2ludGVybmFsUmVkdWNlciA9IHRoaXMuX2ludGVybmFsUmVkdWNlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKHRoaXMuX2ludGVybmFsUmVkdWNlciwgbWlkZGxld2FyZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIFJlZHV4UHJvY2Vzc0dyb3VwXG4gICAqIEBwYXJhbSAgcHJvY2Vzc0dyb3VwXG4gICAqL1xuICBhZGRQcm9jZXNzR3JvdXAocHJvY2Vzc0dyb3VwOiBJUmVkdXhQcm9jZXNzR3JvdXA8YW55LCBhbnk+KTogdGhpcyB7XG4gICAgaWYgKHRoaXMuZXJyb3JIYW5kbGVyKSB7XG4gICAgICBwcm9jZXNzR3JvdXAuc2V0RXJyb3JIYW5kbGVyKHRoaXMuZXJyb3JIYW5kbGVyKVxuICAgIH1cbiAgICB0aGlzLnByb2Nlc3Nlc1twcm9jZXNzR3JvdXAuZ3JvdXBOYW1lXSA9IHByb2Nlc3NHcm91cC5nZXRSZWR1Y2VyKClcbiAgICB0aGlzLl91cGRhdGVSZWR1Y2VyKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIFJlZHV4UHJvY2Vzc0dyb3VwXG4gICAqIEBwYXJhbSAgcHJvY2Vzc0dyb3VwXG4gICAqL1xuICByZW1vdmVQcm9jZXNzR3JvdXAocHJvY2Vzc0dyb3VwOiBJUmVkdXhQcm9jZXNzR3JvdXA8YW55LCBhbnk+KTogdGhpcyB7XG4gICAgZGVsZXRlIHRoaXMucHJvY2Vzc2VzW3Byb2Nlc3NHcm91cC5ncm91cE5hbWVdXG4gICAgdGhpcy5fdXBkYXRlUmVkdWNlcigpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYW4gaW50ZXJuYWwgZ2xvYmFsIGVycm9yIGhhbmRsZXIgZm9yIGFjdGlvbnMgd2hlbiBkaXNwYXRjaGVkIChzaG91bGQgYmUgc2V0IGJlZm9yZSBjYWxsaW5nIGBhZGRQcm9jZXNzR3JvdXBgKVxuICAgKiBAcGFyYW0gIGNiXG4gICAqL1xuICBzZXRFcnJvckhhbmRsZXIoY2I6IEVycm9ySGFuZGxlcjxHbG9iYWxTdGF0ZT4pIHtcbiAgICB0aGlzLmVycm9ySGFuZGxlciA9IGNiXG4gIH1cblxuICBfdXBkYXRlUmVkdWNlcigpIHtcbiAgICBjb25zdCBuZXdSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHRoaXMucHJvY2Vzc2VzKVxuICAgIHRoaXMuc3RvcmUucmVwbGFjZVJlZHVjZXIobmV3UmVkdWNlcilcbiAgfVxuXG4gIF9pbnRlcm5hbFJlZHVjZXIoc3RhdGU6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSkge1xuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmF3IHJlZHV4IHN0b3JlXG4gICAqL1xuICBnZXRTdG9yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZVxuICB9XG59XG4iXX0=