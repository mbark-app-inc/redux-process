import { IReduxProcess } from './interfaces/IReduxProcess'
import { ReduxProcessOptions } from './types/ReduxProcess'
/**
 * An abstract class that pairs a redux action (performAction) with a "fraction" of a redux reducer (getNewState)
 * @typeParam Form                a type that is passed into the action when executed. If there is no form type, `null` can be used.
 * @typeParam PayloadValue        the type returned from performAction and the first argument passed into getNewState
 * @typeParam ProcessGroupState   the type of the process group
 * @typeParam GlobalState         the type of the full redux store state
 */
export declare abstract class ReduxProcess<
  Form,
  PayloadValue,
  ProcessGroupState,
  GlobalState
> implements IReduxProcess<Form, PayloadValue, ProcessGroupState, GlobalState> {
  options: ReduxProcessOptions
  /**
   * Get the name of the action
   * @return
   */
  static getProcessKey(): string
  /**
   * Create a new ReduxProcess
   */
  constructor(options: ReduxProcessOptions)
  /**
   * An abstract method that is executed as the "action" in redux
   * @param  form  value that is passed into the action when executed
   * @param  store the full redux store state
   * @return
   */
  abstract performAction(
    form: Form,
    store: GlobalState
  ): PayloadValue | Promise<PayloadValue>
  /**
   * Return a new state for the given action
   * @param  payload  the value that was returned from performAction method
   * @param  oldState the old state that
   * @return          a new state. This should NOT be a modified value but a NEW value
   */
  abstract getNewState(
    payload: PayloadValue,
    oldState: ProcessGroupState
  ): ProcessGroupState
}
