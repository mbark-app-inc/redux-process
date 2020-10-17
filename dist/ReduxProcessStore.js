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
        this._internalReducer = this._internalReducer.bind(this);
        this.store = redux_1.createStore(this._internalReducer, middleware);
    }
    addProcessGroup(processGroup) {
        this.processes[processGroup.groupName] = processGroup.getReducer();
        return this;
    }
    removeProcessGroup(processGroup) {
        delete this.processes[processGroup.groupName];
        return this;
    }
    _internalReducer(state = {}, action) {
        const mergedState = {};
        for (const processName in this.processes) {
            const reducer = this.processes[processName];
            const origState = state[processName];
            const newState = reducer(origState, action);
            mergedState[processName] = newState;
        }
        return mergedState;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVkdXhQcm9jZXNzU3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvUmVkdXhQcm9jZXNzU3RvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOERBQStCO0FBQy9CLGlDQUFvRTtBQUtwRSxNQUFhLGlCQUFpQjtJQU81QixZQUFZLGNBQXFCLEVBQUU7UUFMekIsY0FBUyxHQUdmLEVBQUUsQ0FBQTtRQUdKLE1BQU0sVUFBVSxHQUFHLHVCQUFlLENBQUMscUJBQUssRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFBO1FBQ3pELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hELElBQUksQ0FBQyxLQUFLLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDN0QsQ0FBQztJQUVELGVBQWUsQ0FBQyxZQUEwQztRQUN4RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxZQUFZLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbEUsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBRUQsa0JBQWtCLENBQUMsWUFBMEM7UUFDM0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUM3QyxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUE2QixFQUFFLEVBQUUsTUFBK0I7UUFDL0UsTUFBTSxXQUFXLEdBQXdCLEVBQUUsQ0FBQTtRQUMzQyxLQUFLLE1BQU0sV0FBVyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUMzQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDcEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUMzQyxXQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFBO1NBQ3BDO1FBQ0QsT0FBTyxXQUFXLENBQUE7SUFDcEIsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUE7SUFDbkIsQ0FBQztDQUNGO0FBckNELDhDQXFDQztBQUVELGtDQUFrQztBQUNsQyx3RUFBd0U7QUFDeEUscURBQXFEO0FBQ3JELHdEQUF3RDtBQUN4RCxFQUFFO0FBQ0YsNENBQTRDO0FBQzVDLEVBQUU7QUFDRixxQ0FBcUM7QUFDckMsNkJBQTZCO0FBQzdCLDhCQUE4QjtBQUM5QixLQUFLO0FBQ0wsRUFBRTtBQUNGLDRCQUE0QjtBQUM1QixvQkFBb0I7QUFDcEIsc0JBQXNCO0FBQ3RCLElBQUk7QUFDSixFQUFFO0FBQ0YseURBQXlEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRodW5rIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IHsgU3RvcmUsIGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUsIFJlZHVjZXIgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IElSZWR1eFByb2Nlc3NTdG9yZSB9IGZyb20gJy4vaW50ZXJmYWNlcy9JUmVkdXhQcm9jZXNzU3RvcmUnXG5pbXBvcnQgeyBJUmVkdXhQcm9jZXNzR3JvdXAgfSBmcm9tICcuL2ludGVyZmFjZXMvSVJlZHV4UHJvY2Vzc0dyb3VwJ1xuaW1wb3J0IHsgUmVkdXhQcm9jZXNzQWN0aW9uIH0gZnJvbSAnLi90eXBlcy9SZWR1eFByb2Nlc3MnXG5cbmV4cG9ydCBjbGFzcyBSZWR1eFByb2Nlc3NTdG9yZSBpbXBsZW1lbnRzIElSZWR1eFByb2Nlc3NTdG9yZSB7XG4gIHByb3RlY3RlZCBzdG9yZTogU3RvcmU8YW55LCBSZWR1eFByb2Nlc3NBY3Rpb248YW55Pj5cbiAgcHJvdGVjdGVkIHByb2Nlc3NlczogUmVjb3JkPFxuICAgIHN0cmluZyxcbiAgICBSZWR1Y2VyPGFueSwgUmVkdXhQcm9jZXNzQWN0aW9uPGFueT4+XG4gID4gPSB7fVxuXG4gIGNvbnN0cnVjdG9yKG1pZGRsZXdhcmVzOiBhbnlbXSA9IFtdKSB7XG4gICAgY29uc3QgbWlkZGxld2FyZSA9IGFwcGx5TWlkZGxld2FyZSh0aHVuaywgLi4ubWlkZGxld2FyZXMpXG4gICAgdGhpcy5faW50ZXJuYWxSZWR1Y2VyID0gdGhpcy5faW50ZXJuYWxSZWR1Y2VyLmJpbmQodGhpcylcbiAgICB0aGlzLnN0b3JlID0gY3JlYXRlU3RvcmUodGhpcy5faW50ZXJuYWxSZWR1Y2VyLCBtaWRkbGV3YXJlKVxuICB9XG5cbiAgYWRkUHJvY2Vzc0dyb3VwKHByb2Nlc3NHcm91cDogSVJlZHV4UHJvY2Vzc0dyb3VwPGFueSwgYW55Pik6IHRoaXMge1xuICAgIHRoaXMucHJvY2Vzc2VzW3Byb2Nlc3NHcm91cC5ncm91cE5hbWVdID0gcHJvY2Vzc0dyb3VwLmdldFJlZHVjZXIoKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVQcm9jZXNzR3JvdXAocHJvY2Vzc0dyb3VwOiBJUmVkdXhQcm9jZXNzR3JvdXA8YW55LCBhbnk+KTogdGhpcyB7XG4gICAgZGVsZXRlIHRoaXMucHJvY2Vzc2VzW3Byb2Nlc3NHcm91cC5ncm91cE5hbWVdXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIF9pbnRlcm5hbFJlZHVjZXIoc3RhdGU6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7fSwgYWN0aW9uOiBSZWR1eFByb2Nlc3NBY3Rpb248YW55Pikge1xuICAgIGNvbnN0IG1lcmdlZFN0YXRlOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cbiAgICBmb3IgKGNvbnN0IHByb2Nlc3NOYW1lIGluIHRoaXMucHJvY2Vzc2VzKSB7XG4gICAgICBjb25zdCByZWR1Y2VyID0gdGhpcy5wcm9jZXNzZXNbcHJvY2Vzc05hbWVdXG4gICAgICBjb25zdCBvcmlnU3RhdGUgPSBzdGF0ZVtwcm9jZXNzTmFtZV1cbiAgICAgIGNvbnN0IG5ld1N0YXRlID0gcmVkdWNlcihvcmlnU3RhdGUsIGFjdGlvbilcbiAgICAgIG1lcmdlZFN0YXRlW3Byb2Nlc3NOYW1lXSA9IG5ld1N0YXRlXG4gICAgfVxuICAgIHJldHVybiBtZXJnZWRTdGF0ZVxuICB9XG5cbiAgZ2V0U3RvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmVcbiAgfVxufVxuXG4vLyBpbXBvcnQgdGh1bmsgZnJvbSAncmVkdXgtdGh1bmsnXG4vLyBpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcbi8vIGltcG9ydCBhdXRoLCB7IEF1dGhTdGF0ZSB9IGZyb20gJy4vcHJvY2Vzc2VzL0F1dGgnXG4vLyBpbXBvcnQgcG9zdHMsIHsgUG9zdHNTdGF0ZSB9IGZyb20gJy4vcHJvY2Vzc2VzL1Bvc3RzJ1xuLy9cbi8vIGNvbnN0IG1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUodGh1bmspXG4vL1xuLy8gY29uc3QgcmVkdWNlcnMgPSBjb21iaW5lUmVkdWNlcnMoe1xuLy8gICBhdXRoOiBhdXRoLmdldFJlZHVjZXIoKSxcbi8vICAgcG9zdHM6IHBvc3RzLmdldFJlZHVjZXIoKVxuLy8gfSlcbi8vXG4vLyBleHBvcnQgdHlwZSBSb290U3RhdGUgPSB7XG4vLyAgIGF1dGg6IEF1dGhTdGF0ZVxuLy8gICBwb3N0czogUG9zdHNTdGF0ZVxuLy8gfVxuLy9cbi8vIGV4cG9ydCBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXJzLCBtaWRkbGV3YXJlKVxuIl19