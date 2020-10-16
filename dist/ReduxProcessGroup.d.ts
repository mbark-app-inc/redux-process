import { ThunkAction } from 'redux-thunk'
import { Reducer } from 'redux'
import { IReduxProcessClass } from './interfaces/IReduxProcess'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction, ReduxProcessOptions } from './types/ReduxProcess'
import { ReduxProcessGroupOptions } from './types/ReduxProcessGroup'
export declare class ReduxProcessGroup<GroupState, GlobalState>
  implements IReduxProcessGroup<GroupState, GlobalState> {
  groupName: string
  options: ReduxProcessGroupOptions<GroupState>
  constructor(groupName: string, options: ReduxProcessGroupOptions<GroupState>)
  getDefaultState(): GroupState
  execute<Form, PayloadValue>(
    CustomReduxProcess: IReduxProcessClass<
      Form,
      PayloadValue,
      GroupState,
      GlobalState
    >,
    form?: Form | null
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
