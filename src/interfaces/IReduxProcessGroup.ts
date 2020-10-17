import { ThunkAction } from 'redux-thunk'
import { Reducer } from 'redux'
import { ReduxProcessAction, ReduxProcessOptions } from '../types/ReduxProcess'
import { ReduxProcessGroupOptions } from '../types/ReduxProcessGroup'
import { IReduxProcessClass } from './IReduxProcess'

export interface IReduxProcessGroupClass<ProcessGroupState, GlobalState> {
  new (
    groupName: string,
    options: ReduxProcessGroupOptions<ProcessGroupState>
  ): IReduxProcessGroup<ProcessGroupState, GlobalState>
}

export interface IReduxProcessGroup<ProcessGroupState, GlobalState> {
  groupName: string
  options: ReduxProcessGroupOptions<ProcessGroupState>

  getDefaultState(): ProcessGroupState

  execute<Form, PayloadValue>(
    CustomReduxProcess: IReduxProcessClass<
      Form,
      PayloadValue,
      ProcessGroupState,
      GlobalState
    >,
    form: Form
  ): ThunkAction<
    Promise<PayloadValue>,
    GlobalState,
    unknown,
    ReduxProcessAction<PayloadValue>
  >

  getReducer(): Reducer<ProcessGroupState, ReduxProcessAction<any>>

  getFormattedActionType(key: string): string

  getReduxProcessOptions(store?: GlobalState): ReduxProcessOptions
}
