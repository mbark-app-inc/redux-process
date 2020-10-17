import { IReduxProcessGroup } from './IReduxProcessGroup'
import { Store } from 'redux'
import { ReduxProcessAction } from '../types/ReduxProcess'
export interface IReduxProcessStoreClass {
  new (middleware: any[]): IReduxProcessStore
}
export interface IReduxProcessStore {
  addProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
  removeProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
  getStore(): Store<any, ReduxProcessAction<any>>
}
