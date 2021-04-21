"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxProcessStore = void 0;
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const redux_1 = require("redux");
/**
 * A global store manager for redux. Allows the ability to dynamically add and remove "sub-stores" (ReduxProcessGroup)
 */
class ReduxProcessStore {
    /**
     * Create a new instance
     * @param middlewares optional array of additional middlewars to attach. Redux-thunk is already used
     */
    constructor(middlewares = []) {
        this.processes = {};
        const middleware = redux_1.applyMiddleware(redux_thunk_1.default, ...middlewares);
        this._internalReducer = this._internalReducer.bind(this);
        this.store = redux_1.createStore(this._internalReducer, middleware);
    }
    /**
     * Register a ReduxProcessGroup
     * @param  processGroup
     */
    addProcessGroup(processGroup) {
        if (this.errorHandler) {
            processGroup.setErrorHandler(this.errorHandler);
        }
        this.processes[processGroup.groupName] = processGroup.getReducer();
        this._updateReducer();
        return this;
    }
    /**
     * Remove a ReduxProcessGroup
     * @param  processGroup
     */
    removeProcessGroup(processGroup) {
        delete this.processes[processGroup.groupName];
        this._updateReducer();
        return this;
    }
    /**
     * Set an internal global error handler for actions when dispatched (should be set before calling `addProcessGroup`)
     * @param  cb
     */
    setErrorHandler(cb) {
        this.errorHandler = cb;
    }
    _updateReducer() {
        const newReducer = redux_1.combineReducers(this.processes);
        this.store.replaceReducer(newReducer);
    }
    _internalReducer(state = {}) {
        return state;
    }
    /**
     * Get the raw redux store
     */
    getStore() {
        return this.store;
    }
}
exports.ReduxProcessStore = ReduxProcessStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkdXhQcm9jZXNzU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkdXhQcm9jZXNzU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOERBQStCO0FBQy9CLGlDQU1jO0FBTWQ7O0dBRUc7QUFDSCxNQUFhLGlCQUFpQjtJQVE1Qjs7O09BR0c7SUFDSCxZQUFZLGNBQXFCLEVBQUU7UUFWekIsY0FBUyxHQUdmLEVBQUUsQ0FBQTtRQVFKLE1BQU0sVUFBVSxHQUFHLHVCQUFlLENBQUMscUJBQUssRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWUsQ0FBQyxZQUEwQztRQUN4RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsWUFBWSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7U0FDaEQ7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbEUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3JCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVEOzs7T0FHRztJQUNILGtCQUFrQixDQUFDLFlBQTBDO1FBQzNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQ3JCLE9BQU8sSUFBSSxDQUFBO0lBQ2IsQ0FBQztJQUVEOzs7T0FHRztJQUNILGVBQWUsQ0FBQyxFQUE2QjtRQUMzQyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQTtJQUN4QixDQUFDO0lBRUQsY0FBYztRQUNaLE1BQU0sVUFBVSxHQUFHLHVCQUFlLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUE2QixFQUFFO1FBQzlDLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVEOztPQUVHO0lBQ0gsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0NBQ0Y7QUFoRUQsOENBZ0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IHtcbiAgU3RvcmUsXG4gIGNyZWF0ZVN0b3JlLFxuICBhcHBseU1pZGRsZXdhcmUsXG4gIGNvbWJpbmVSZWR1Y2VycyxcbiAgUmVkdWNlclxufSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IElSZWR1eFByb2Nlc3NTdG9yZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JUmVkdXhQcm9jZXNzU3RvcmUnXG5pbXBvcnQgeyBJUmVkdXhQcm9jZXNzR3JvdXAgfSBmcm9tICcuL2ludGVyZmFjZXMvSVJlZHV4UHJvY2Vzc0dyb3VwJ1xuaW1wb3J0IHsgUmVkdXhQcm9jZXNzQWN0aW9uIH0gZnJvbSAnLi90eXBlcy9SZWR1eFByb2Nlc3MnXG5pbXBvcnQgeyBFcnJvckhhbmRsZXIgfSBmcm9tICcuL3R5cGVzL1JlZHV4UHJvY2Vzc0dyb3VwJ1xuXG4vKipcbiAqIEEgZ2xvYmFsIHN0b3JlIG1hbmFnZXIgZm9yIHJlZHV4LiBBbGxvd3MgdGhlIGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgYWRkIGFuZCByZW1vdmUgXCJzdWItc3RvcmVzXCIgKFJlZHV4UHJvY2Vzc0dyb3VwKVxuICovXG5leHBvcnQgY2xhc3MgUmVkdXhQcm9jZXNzU3RvcmU8R2xvYmFsU3RhdGU+IGltcGxlbWVudHMgSVJlZHV4UHJvY2Vzc1N0b3JlIHtcbiAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTxhbnksIFJlZHV4UHJvY2Vzc0FjdGlvbjxhbnk+PlxuICBwcm90ZWN0ZWQgcHJvY2Vzc2VzOiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIFJlZHVjZXI8YW55LCBSZWR1eFByb2Nlc3NBY3Rpb248YW55Pj5cbiAgPiA9IHt9XG4gIHByb3RlY3RlZCBlcnJvckhhbmRsZXI/OiBFcnJvckhhbmRsZXI8R2xvYmFsU3RhdGU+XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZVxuICAgKiBAcGFyYW0gbWlkZGxld2FyZXMgb3B0aW9uYWwgYXJyYXkgb2YgYWRkaXRpb25hbCBtaWRkbGV3YXJzIHRvIGF0dGFjaC4gUmVkdXgtdGh1bmsgaXMgYWxyZWFkeSB1c2VkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihtaWRkbGV3YXJlczogYW55W10gPSBbXSkge1xuICAgIGNvbnN0IG1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUodGh1bmssIC4uLm1pZGRsZXdhcmVzKVxuICAgIHRoaXMuX2ludGVybmFsUmVkdWNlciA9IHRoaXMuX2ludGVybmFsUmVkdWNlci5iaW5kKHRoaXMpXG4gICAgdGhpcy5zdG9yZSA9IGNyZWF0ZVN0b3JlKHRoaXMuX2ludGVybmFsUmVkdWNlciwgbWlkZGxld2FyZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIFJlZHV4UHJvY2Vzc0dyb3VwXG4gICAqIEBwYXJhbSAgcHJvY2Vzc0dyb3VwXG4gICAqL1xuICBhZGRQcm9jZXNzR3JvdXAocHJvY2Vzc0dyb3VwOiBJUmVkdXhQcm9jZXNzR3JvdXA8YW55LCBhbnk+KTogdGhpcyB7XG4gICAgaWYgKHRoaXMuZXJyb3JIYW5kbGVyKSB7XG4gICAgICBwcm9jZXNzR3JvdXAuc2V0RXJyb3JIYW5kbGVyKHRoaXMuZXJyb3JIYW5kbGVyKVxuICAgIH1cbiAgICB0aGlzLnByb2Nlc3Nlc1twcm9jZXNzR3JvdXAuZ3JvdXBOYW1lXSA9IHByb2Nlc3NHcm91cC5nZXRSZWR1Y2VyKClcbiAgICB0aGlzLl91cGRhdGVSZWR1Y2VyKClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIFJlZHV4UHJvY2Vzc0dyb3VwXG4gICAqIEBwYXJhbSAgcHJvY2Vzc0dyb3VwXG4gICAqL1xuICByZW1vdmVQcm9jZXNzR3JvdXAocHJvY2Vzc0dyb3VwOiBJUmVkdXhQcm9jZXNzR3JvdXA8YW55LCBhbnk+KTogdGhpcyB7XG4gICAgZGVsZXRlIHRoaXMucHJvY2Vzc2VzW3Byb2Nlc3NHcm91cC5ncm91cE5hbWVdXG4gICAgdGhpcy5fdXBkYXRlUmVkdWNlcigpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYW4gaW50ZXJuYWwgZ2xvYmFsIGVycm9yIGhhbmRsZXIgZm9yIGFjdGlvbnMgd2hlbiBkaXNwYXRjaGVkIChzaG91bGQgYmUgc2V0IGJlZm9yZSBjYWxsaW5nIGBhZGRQcm9jZXNzR3JvdXBgKVxuICAgKiBAcGFyYW0gIGNiXG4gICAqL1xuICBzZXRFcnJvckhhbmRsZXIoY2I6IEVycm9ySGFuZGxlcjxHbG9iYWxTdGF0ZT4pIHtcbiAgICB0aGlzLmVycm9ySGFuZGxlciA9IGNiXG4gIH1cblxuICBfdXBkYXRlUmVkdWNlcigpIHtcbiAgICBjb25zdCBuZXdSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHRoaXMucHJvY2Vzc2VzKVxuICAgIHRoaXMuc3RvcmUucmVwbGFjZVJlZHVjZXIobmV3UmVkdWNlcilcbiAgfVxuXG4gIF9pbnRlcm5hbFJlZHVjZXIoc3RhdGU6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSkge1xuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcmF3IHJlZHV4IHN0b3JlXG4gICAqL1xuICBnZXRTdG9yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZVxuICB9XG59XG4iXX0=