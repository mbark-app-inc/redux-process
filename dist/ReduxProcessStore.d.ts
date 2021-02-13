import { Store, Reducer } from 'redux'
import { IReduxProcessStore } from './interfaces/IReduxProcessStore'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction } from './types/ReduxProcess'
import { ErrorHandler } from './types/ReduxProcessGroup'
export declare class ReduxProcessStore implements IReduxProcessStore {
  protected store: Store<any, ReduxProcessAction<any>>
  protected processes: Record<string, Reducer<any, ReduxProcessAction<any>>>
  protected errorHandler?: ErrorHandler
  constructor(middlewares?: any[])
  addProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
  removeProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
  setErrorHandler(cb: ErrorHandler): void
  _updateReducer(): void
  _internalReducer(state?: Record<string, any>): Record<string, any>
  getStore(): Store<any, ReduxProcessAction<any>>
}
