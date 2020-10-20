import thunk from 'redux-thunk'
import {
  Store,
  createStore,
  applyMiddleware,
  combineReducers,
  Reducer
} from 'redux'
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
    this._internalReducer = this._internalReducer.bind(this)
    this.store = createStore(this._internalReducer, middleware)
  }

  addProcessGroup(processGroup: IReduxProcessGroup<any, any>): this {
    this.processes[processGroup.groupName] = processGroup.getReducer()
    this._updateReducer()
    return this
  }

  removeProcessGroup(processGroup: IReduxProcessGroup<any, any>): this {
    delete this.processes[processGroup.groupName]
    this._updateReducer()
    return this
  }

  _updateReducer() {
    const newReducer = combineReducers(this.processes)
    this.store.replaceReducer(newReducer)
  }

  _internalReducer(state: Record<string, any> = {}) {
    return state
  }

  getStore() {
    return this.store
  }
}
