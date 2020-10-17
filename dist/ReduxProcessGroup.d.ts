import { ThunkAction } from 'redux-thunk'
import { Reducer } from 'redux'
import { IReduxProcessClass } from './interfaces/IReduxProcess'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction, ReduxProcessOptions } from './types/ReduxProcess'
import { ReduxProcessGroupOptions } from './types/ReduxProcessGroup'
export declare class ReduxProcessGroup<ProcessGroupState, GlobalState>
  implements IReduxProcessGroup<ProcessGroupState, GlobalState> {
  groupName: string
  options: ReduxProcessGroupOptions<ProcessGroupState>
  constructor(
    groupName: string,
    options: ReduxProcessGroupOptions<ProcessGroupState>
  )
  getDefaultState(): ProcessGroupState
  execute<Form, PayloadValue>(
    CustomReduxProcess: IReduxProcessClass<
      Form,
      PayloadValue,
      ProcessGroupState,
      GlobalState
    >,
    form?: Form | null
  ): ThunkAction<
    Promise<PayloadValue>,
    GlobalState,
    unknown,
    ReduxProcessAction<PayloadValue>
  >
  getReducer(): Reducer<ProcessGroupState, ReduxProcessAction<any>>
  getFormattedActionType(key: string): string
  getReduxProcessOptions(_?: GlobalState): ReduxProcessOptions
}
