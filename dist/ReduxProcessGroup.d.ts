import { ThunkAction } from 'redux-thunk'
import { Reducer } from 'redux'
import { IReduxProcessClass } from './interfaces/IReduxProcess'
import { IReduxProcessGroup } from './interfaces/IReduxProcessGroup'
import { ReduxProcessAction, ReduxProcessOptions } from './types/ReduxProcess'
import {
  ReduxProcessGroupOptions,
  ErrorHandler
} from './types/ReduxProcessGroup'
/**
 * [constructor description]
 * @param groupName the name prefix for the group (e.g globalstate.auth.<props> => 'auth')
 * @param options   object containing the processes for this group and a default state
 */
export declare class ReduxProcessGroup<ProcessGroupState, GlobalState>
  implements IReduxProcessGroup<ProcessGroupState, GlobalState> {
  groupName: string
  options: ReduxProcessGroupOptions<ProcessGroupState>
  protected errorHandler?: ErrorHandler<GlobalState>
  constructor(
    groupName: string,
    options: ReduxProcessGroupOptions<ProcessGroupState>
  )
  /**
   * Get the default state
   */
  getDefaultState(): ProcessGroupState
  /**
   * Set the error handler for this specific group (internal)
   * @param  cb
   */
  setErrorHandler(cb: ErrorHandler<GlobalState>): void
  /**
   * Forms a ReduxProcess and passed form values into a redux action to be executed by dispatch
   * @param  ReduxProcess a process that is owned by this group
   */
  execute<Form, PayloadValue>(
    CustomReduxProcess: IReduxProcessClass<
      Form,
      PayloadValue,
      ProcessGroupState,
      GlobalState
    >,
    form?: Form | null
  ): ThunkAction<
    Promise<PayloadValue | void>,
    GlobalState,
    unknown,
    ReduxProcessAction<PayloadValue>
  >
  /**
   * Return the full reducer for this group. This is registed to redux
   */
  getReducer(): Reducer<ProcessGroupState, ReduxProcessAction<any>>
  /**
   * Form an action name (internal)
   * @param  key
   */
  getFormattedActionType(key: string): string
  /**
   * Get default options for a process (can be overwritten in subclass)
   * @param  store  global state
   */
  getReduxProcessOptions(_?: GlobalState): ReduxProcessOptions
}
