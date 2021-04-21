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
import { ErrorHandler } from './types/ReduxProcessGroup'

/**
 * A global store manager for redux. Allows the ability to dynamically add and remove "sub-stores" (ReduxProcessGroup)
 */
export class ReduxProcessStore implements IReduxProcessStore {
  protected store: Store<any, ReduxProcessAction<any>>
  protected processes: Record<
    string,
    Reducer<any, ReduxProcessAction<any>>
  > = {}
  protected errorHandler?: ErrorHandler

  /**
   * Create a new instance
   * @param middlewares optional array of additional middlewars to attach. Redux-thunk is already used
   */
  constructor(middlewares: any[] = []) {
    const middleware = applyMiddleware(thunk, ...middlewares)
    this._internalReducer = this._internalReducer.bind(this)
    this.store = createStore(this._internalReducer, middleware)
  }

  /**
   * Register a ReduxProcessGroup
   * @param  processGroup
   */
  addProcessGroup(processGroup: IReduxProcessGroup<any, any>): this {
    if (this.errorHandler) {
      processGroup.setErrorHandler(this.errorHandler)
    }
    this.processes[processGroup.groupName] = processGroup.getReducer()
    this._updateReducer()
    return this
  }

  /**
   * Remove a ReduxProcessGroup
   * @param  processGroup
   */
  removeProcessGroup(processGroup: IReduxProcessGroup<any, any>): this {
    delete this.processes[processGroup.groupName]
    this._updateReducer()
    return this
  }

  /**
   * Set an internal global error handler for actions when dispatched (should be set before calling `addProcessGroup`)
   * @param  cb
   */
  setErrorHandler(cb: ErrorHandler) {
    this.errorHandler = cb
  }

  _updateReducer() {
    const newReducer = combineReducers(this.processes)
    this.store.replaceReducer(newReducer)
  }

  _internalReducer(state: Record<string, any> = {}) {
    return state
  }

  /**
   * Get the raw redux store
   */
  getStore() {
    return this.store
  }
}
