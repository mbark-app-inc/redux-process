import { IReduxProcess } from './interfaces/IReduxProcess'
import { ReduxProcessOptions } from './types/ReduxProcess'
export declare abstract class ReduxProcess<
  Form,
  PayloadValue,
  ProcessGroupState,
  GlobalState
> implements IReduxProcess<Form, PayloadValue, ProcessGroupState, GlobalState> {
  options: ReduxProcessOptions
  static getProcessKey(): string
  constructor(options: ReduxProcessOptions)
  abstract performAction(
    form: Form,
    store: GlobalState
  ): PayloadValue | Promise<PayloadValue>
  abstract getNewState(
    payload: PayloadValue,
    oldState: ProcessGroupState
  ): ProcessGroupState
}
