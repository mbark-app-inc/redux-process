import { Store, Reducer } from 'redux'
import { IReduxProcessStore } from './interfaces/IReduxProcessStore'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction } from './types/ReduxProcess'
import { ErrorHandler } from './types/ReduxProcessGroup'
/**
 * A global store manager for redux. Allows the ability to dynamically add and remove "sub-stores" (ReduxProcessGroup)
 */
export declare class ReduxProcessStore<GlobalState>
  implements IReduxProcessStore {
  protected store: Store<any, ReduxProcessAction<any>>
  protected processes: Record<string, Reducer<any, ReduxProcessAction<any>>>
  protected errorHandler?: ErrorHandler<GlobalState>
  /**
   * Create a new instance
   * @param middlewares optional array of additional middlewars to attach. Redux-thunk is already used
   */
  constructor(middlewares?: any[])
  /**
   * Register a ReduxProcessGroup
   * @param  processGroup
   */
  addProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
  /**
   * Remove a ReduxProcessGroup
   * @param  processGroup
   */
  removeProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
  /**
   * Set an internal global error handler for actions when dispatched (should be set before calling `addProcessGroup`)
   * @param  cb
   */
  setErrorHandler(cb: ErrorHandler<GlobalState>): void
  _updateReducer(): void
  _internalReducer(state?: Record<string, any>): Record<string, any>
  /**
   * Get the raw redux store
   */
  getStore(): Store<any, ReduxProcessAction<any>>
}
