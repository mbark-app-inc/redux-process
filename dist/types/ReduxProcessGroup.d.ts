import { IReduxProcessClass } from '../interfaces/IReduxProcess'
export declare type ReduxProcessGroupOptions<DefaultStateType> = {
  processes: IReduxProcessClass<any, any, any, any>[]
  defaultState: DefaultStateType
}
