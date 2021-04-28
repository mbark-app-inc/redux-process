import { IReduxProcessClass } from '../interfaces/IReduxProcess'
export declare type ReduxProcessGroupOptions<DefaultStateType> = {
  processes: IReduxProcessClass<any, any, any, any>[]
  defaultState: DefaultStateType
}
declare type ErrorHandlerResponse = void
export declare type ErrorHandler<T> = (
  error: Error,
  dispatch: any,
  store: T
) => ErrorHandlerResponse | Promise<ErrorHandlerResponse>
export declare type ReduxProcessActionTypes = Map<
  IReduxProcessClass<any, any, any, any>,
  string
>
export {}
