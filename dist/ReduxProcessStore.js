"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxProcessStore = void 0;
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const redux_1 = require("redux");
class ReduxProcessStore {
    constructor(middlewares = []) {
        this.processes = {};
        const middleware = redux_1.applyMiddleware(redux_thunk_1.default, ...middlewares);
        this.store = redux_1.createStore(this._internalReducer.bind(this), middleware);
    }
    addProcessGroup(processGroup) {
        this.processes[processGroup.groupName] = processGroup.getReducer();
        return this;
    }
    removeProcessGroup(processGroup) {
        delete this.processes[processGroup.groupName];
        return this;
    }
    _internalReducer(state, action) {
        const mergedState = {};
        for (const processName in this.processes) {
            const reducer = this.processes[processName];
            const origState = state[processName];
            const newState = reducer(origState, action);
            mergedState[processName] = newState;
        }
        return mergedState;
    }
    _getStrippedState(state, defaultState) {
        return Object.entries(state).reduce((newState, [key, value]) => {
            if (key in newState) {
                ;
                newState[key] = value;
            }
            return newState;
        }, defaultState);
    }
    getStore() {
        return this.store;
    }
}
exports.ReduxProcessStore = ReduxProcessStore;
// import thunk from 'redux-thunk'
// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import auth, { AuthState } from './processes/Auth'
// import posts, { PostsState } from './processes/Posts'
//
// const middleware = applyMiddleware(thunk)
//
// const reducers = combineReducers({
//   auth: auth.getReducer(),
//   posts: posts.getReducer()
// })
//
// export type RootState = {
//   auth: AuthState
//   posts: PostsState
// }
//
// export const store = createStore(reducers, middleware)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkdXhQcm9jZXNzU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkdXhQcm9jZXNzU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOERBQStCO0FBQy9CLGlDQUFvRTtBQUtwRSxNQUFhLGlCQUFpQjtJQUk1QixZQUFZLGNBQXFCLEVBQUU7UUFGekIsY0FBUyxHQUEwRCxFQUFFLENBQUE7UUFHN0UsTUFBTSxVQUFVLEdBQUcsdUJBQWUsQ0FBQyxxQkFBSyxFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLEtBQUssR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELGVBQWUsQ0FBRSxZQUEwQztRQUN6RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbEUsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsa0JBQWtCLENBQUUsWUFBMEM7UUFDNUQsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUM3QyxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFUyxnQkFBZ0IsQ0FDeEIsS0FBVSxFQUNWLE1BQStCO1FBRS9CLE1BQU0sV0FBVyxHQUF3QixFQUFFLENBQUE7UUFDM0MsS0FBSyxNQUFNLFdBQVcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDM0MsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3BDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDM0MsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFFBQVEsQ0FBQTtTQUNwQztRQUNELE9BQU8sV0FBVyxDQUFBO0lBQ3BCLENBQUM7SUFFUyxpQkFBaUIsQ0FDekIsS0FBMEIsRUFDMUIsWUFBaUM7UUFFakMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQzdELElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtnQkFDbkIsQ0FBQztnQkFBQyxRQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQTthQUNoQztZQUNELE9BQU8sUUFBUSxDQUFBO1FBQ2pCLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQTtJQUNsQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQTtJQUNuQixDQUFDO0NBQ0Y7QUFoREQsOENBZ0RDO0FBRUQsa0NBQWtDO0FBQ2xDLHdFQUF3RTtBQUN4RSxxREFBcUQ7QUFDckQsd0RBQXdEO0FBQ3hELEVBQUU7QUFDRiw0Q0FBNEM7QUFDNUMsRUFBRTtBQUNGLHFDQUFxQztBQUNyQyw2QkFBNkI7QUFDN0IsOEJBQThCO0FBQzlCLEtBQUs7QUFDTCxFQUFFO0FBQ0YsNEJBQTRCO0FBQzVCLG9CQUFvQjtBQUNwQixzQkFBc0I7QUFDdEIsSUFBSTtBQUNKLEVBQUU7QUFDRix5REFBeUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG5pbXBvcnQgeyBTdG9yZSwgY3JlYXRlU3RvcmUsIGFwcGx5TWlkZGxld2FyZSwgUmVkdWNlciB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHsgSVJlZHV4UHJvY2Vzc1N0b3JlIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0lSZWR1eFByb2Nlc3NTdG9yZSdcbmltcG9ydCB7IElSZWR1eFByb2Nlc3NHcm91cCB9IGZyb20gJy4vaW50ZXJmYWNlcy9JUmVkdXhQcm9jZXNzR3JvdXAnXG5pbXBvcnQgeyBSZWR1eFByb2Nlc3NBY3Rpb24gfSBmcm9tICcuL3R5cGVzL1JlZHV4UHJvY2VzcydcblxuZXhwb3J0IGNsYXNzIFJlZHV4UHJvY2Vzc1N0b3JlIGltcGxlbWVudHMgSVJlZHV4UHJvY2Vzc1N0b3JlIHtcbiAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZTxhbnksIFJlZHV4UHJvY2Vzc0FjdGlvbjxhbnk+PlxuICBwcm90ZWN0ZWQgcHJvY2Vzc2VzOiBSZWNvcmQ8c3RyaW5nLCBSZWR1Y2VyPGFueSwgUmVkdXhQcm9jZXNzQWN0aW9uPGFueT4+PiA9IHt9XG5cbiAgY29uc3RydWN0b3IobWlkZGxld2FyZXM6IGFueVtdID0gW10pIHtcbiAgICBjb25zdCBtaWRkbGV3YXJlID0gYXBwbHlNaWRkbGV3YXJlKHRodW5rLCAuLi5taWRkbGV3YXJlcylcbiAgICB0aGlzLnN0b3JlID0gY3JlYXRlU3RvcmUodGhpcy5faW50ZXJuYWxSZWR1Y2VyLmJpbmQodGhpcyksIG1pZGRsZXdhcmUpXG4gIH1cblxuICBhZGRQcm9jZXNzR3JvdXAgKHByb2Nlc3NHcm91cDogSVJlZHV4UHJvY2Vzc0dyb3VwPGFueSwgYW55Pik6IHRoaXMge1xuICAgIHRoaXMucHJvY2Vzc2VzW3Byb2Nlc3NHcm91cC5ncm91cE5hbWVdID0gcHJvY2Vzc0dyb3VwLmdldFJlZHVjZXIoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVQcm9jZXNzR3JvdXAgKHByb2Nlc3NHcm91cDogSVJlZHV4UHJvY2Vzc0dyb3VwPGFueSwgYW55Pik6IHRoaXMge1xuICAgIGRlbGV0ZSB0aGlzLnByb2Nlc3Nlc1twcm9jZXNzR3JvdXAuZ3JvdXBOYW1lXVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBwcm90ZWN0ZWQgX2ludGVybmFsUmVkdWNlciAoXG4gICAgc3RhdGU6IGFueSxcbiAgICBhY3Rpb246IFJlZHV4UHJvY2Vzc0FjdGlvbjxhbnk+XG4gICkge1xuICAgIGNvbnN0IG1lcmdlZFN0YXRlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cbiAgICBmb3IgKGNvbnN0IHByb2Nlc3NOYW1lIGluIHRoaXMucHJvY2Vzc2VzKSB7XG4gICAgICBjb25zdCByZWR1Y2VyID0gdGhpcy5wcm9jZXNzZXNbcHJvY2Vzc05hbWVdXG4gICAgICBjb25zdCBvcmlnU3RhdGUgPSBzdGF0ZVtwcm9jZXNzTmFtZV1cbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gcmVkdWNlcihvcmlnU3RhdGUsIGFjdGlvbilcbiAgICAgIG1lcmdlZFN0YXRlW3Byb2Nlc3NOYW1lXSA9IG5ld1N0YXRlXG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRTdGF0ZVxuICB9XG5cbiAgcHJvdGVjdGVkIF9nZXRTdHJpcHBlZFN0YXRlKFxuICAgIHN0YXRlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+LFxuICAgIGRlZmF1bHRTdGF0ZTogUmVjb3JkPHN0cmluZywgYW55PlxuICApIHtcbiAgICByZXR1cm4gT2JqZWN0LmVudHJpZXMoc3RhdGUpLnJlZHVjZSgobmV3U3RhdGUsIFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgaWYgKGtleSBpbiBuZXdTdGF0ZSkge1xuICAgICAgICA7KG5ld1N0YXRlIGFzIGFueSlba2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3U3RhdGVcbiAgICB9LCBkZWZhdWx0U3RhdGUpXG4gIH1cblxuICBnZXRTdG9yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZVxuICB9XG59XG5cbi8vIGltcG9ydCB0aHVuayBmcm9tICdyZWR1eC10aHVuaydcbi8vIGltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4J1xuLy8gaW1wb3J0IGF1dGgsIHsgQXV0aFN0YXRlIH0gZnJvbSAnLi9wcm9jZXNzZXMvQXV0aCdcbi8vIGltcG9ydCBwb3N0cywgeyBQb3N0c1N0YXRlIH0gZnJvbSAnLi9wcm9jZXNzZXMvUG9zdHMnXG4vL1xuLy8gY29uc3QgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZSh0aHVuaylcbi8vXG4vLyBjb25zdCByZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4vLyAgIGF1dGg6IGF1dGguZ2V0UmVkdWNlcigpLFxuLy8gICBwb3N0czogcG9zdHMuZ2V0UmVkdWNlcigpXG4vLyB9KVxuLy9cbi8vIGV4cG9ydCB0eXBlIFJvb3RTdGF0ZSA9IHtcbi8vICAgYXV0aDogQXV0aFN0YXRlXG4vLyAgIHBvc3RzOiBQb3N0c1N0YXRlXG4vLyB9XG4vL1xuLy8gZXhwb3J0IGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlcnMsIG1pZGRsZXdhcmUpXG4iXX0=