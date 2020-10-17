import { Store, Reducer } from 'redux'
import { IReduxProcessStore } from './interfaces/IReduxProcessStore'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction } from './types/ReduxProcess'
export declare class ReduxProcessStore implements IReduxProcessStore {
  protected store: Store<any, ReduxProcessAction<any>>
  protected processes: Record<string, Reducer<any, ReduxProcessAction<any>>>
  constructor(middlewares?: any[])
  addProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
  removeProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
  protected _internalReducer(
    state: any,
    action: ReduxProcessAction<any>
  ): Record<string, any>
  protected _getStrippedState(
    state: Record<string, any>,
    defaultState: Record<string, any>
  ): Record<string, any>
  getStore(): Store<any, ReduxProcessAction<any>>
}
