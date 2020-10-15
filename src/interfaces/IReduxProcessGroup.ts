import { ThunkAction } from 'redux-thunk'
import { Reducer } from 'redux'
import { ReduxProcessAction, ReduxProcessOptions } from '../types/ReduxProcess'
import { ReduxProcessGroupOptions } from '../types/ReduxProcessGroup'
import { IReduxProcessClass } from './IReduxProcess'

export interface IReduxProcessGroupClass<GroupState, GlobalState> {
  new (
    groupName: string,
    options: ReduxProcessGroupOptions<GroupState>
  ): IReduxProcessGroup<GroupState, GlobalState>
}

export interface IReduxProcessGroup<GroupState, GlobalState> {
  groupName: string
  options: ReduxProcessGroupOptions<GroupState>

  getDefaultState(): GroupState

  execute<Form, PayloadValue>(
    CustomReduxProcess: IReduxProcessClass<
      Form,
      PayloadValue,
      GroupState,
      GlobalState
    >,
    form: Form
  ): ThunkAction<
    Promise<PayloadValue>,
    GlobalState,
    unknown,
    ReduxProcessAction<PayloadValue>
  >

  getReducer(): Reducer<GroupState, ReduxProcessAction<any>>

  getFormattedActionType(key: string): string

  getReduxProcessOptions(): ReduxProcessOptions
}
