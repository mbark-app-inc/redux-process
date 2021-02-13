import { IReduxProcessClass } from '../interfaces/IReduxProcess'

export type ReduxProcessGroupOptions<DefaultStateType> = {
  processes: IReduxProcessClass<any, any, any, any>[]
  defaultState: DefaultStateType
}

export type ErrorHandler = (error: Error) => Error | void
