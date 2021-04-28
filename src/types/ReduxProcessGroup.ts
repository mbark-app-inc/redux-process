import { IReduxProcessClass } from '../interfaces/IReduxProcess'

export type ReduxProcessGroupOptions<DefaultStateType> = {
  processes: IReduxProcessClass<any, any, any, any>[]
  defaultState: DefaultStateType
}

type ErrorHandlerResponse = void
export type ErrorHandler<T> = (
  error: Error,
  dispatch: any,
  store: T
) => ErrorHandlerResponse | Promise<ErrorHandlerResponse>

export type ReduxProcessActionTypes = Map<
  IReduxProcessClass<any, any, any, any>,
  string
>
