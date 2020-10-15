import { IReduxProcess } from './interfaces/IReduxProcess'
import { ReduxProcessOptions } from './types/ReduxProcess'

export abstract class ReduxProcess<
  Form,
  PayloadValue,
  ProcessGroupState,
  GlobalState
> implements IReduxProcess<Form, PayloadValue, ProcessGroupState, GlobalState> {
  options: ReduxProcessOptions

  static getProcessKey(): string {
    return this.name
  }

  constructor(options: ReduxProcessOptions) {
    this.options = options
  }

  abstract performAction(form: Form, store: GlobalState): Promise<PayloadValue>

  abstract getNewState(
    payload: PayloadValue,
    oldState: ProcessGroupState
  ): ProcessGroupState
}
