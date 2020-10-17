import thunk from 'redux-thunk'
import { Store, createStore, applyMiddleware, Reducer } from 'redux'
import { IReduxProcessStore } from './interfaces/IReduxProcessStore'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction } from './types/ReduxProcess'

export class ReduxProcessStore implements IReduxProcessStore {
  protected store: Store<any, ReduxProcessAction<any>>
  protected processes: Record<
    string,
    Reducer<any, ReduxProcessAction<any>>
  > = {}

  constructor(middlewares: any[] = []) {
    const middleware = applyMiddleware(thunk, ...middlewares)
    this.store = createStore(this._internalReducer.bind(this), middleware)
  }

  addProcessGroup(processGroup: IReduxProcessGroup<any, any>): this {
    this.processes[processGroup.groupName] = processGroup.getReducer()
    return this
  }

  removeProcessGroup(processGroup: IReduxProcessGroup<any, any>): this {
    delete this.processes[processGroup.groupName]
    return this
  }

  protected _internalReducer(state: any, action: ReduxProcessAction<any>) {
    const mergedState: Record<string, any> = {}
    for (const processName in this.processes) {
      const reducer = this.processes[processName]
      const origState = state[processName]
      const newState = reducer(origState, action)
      mergedState[processName] = newState
    }
    return mergedState
  }

  protected _getStrippedState(
    state: Record<string, any>,
    defaultState: Record<string, any>
  ) {
    return Object.entries(state).reduce((newState, [key, value]) => {
      if (key in newState) {
        ;(newState as any)[key] = value
      }
      return newState
    }, defaultState)
  }

  getStore() {
    return this.store
  }
}

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
