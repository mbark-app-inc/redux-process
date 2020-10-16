import { ReduxProcessOptions } from '../types/ReduxProcess'
export interface IReduxProcessClass<
  Form,
  PayloadValue,
  ProcessGroupState,
  GlobalState
> {
  getProcessKey(): string
  new (options: ReduxProcessOptions): IReduxProcess<
    Form,
    PayloadValue,
    ProcessGroupState,
    GlobalState
  >
}
export interface IReduxProcess<
  Form,
  PayloadValue,
  ProcessGroupState,
  GlobalState
> {
  options: ReduxProcessOptions
  performAction(
    form: Form | null,
    store: GlobalState
  ): PayloadValue | Promise<PayloadValue>
  getNewState(
    payload: PayloadValue,
    oldState: ProcessGroupState
  ): ProcessGroupState
}
