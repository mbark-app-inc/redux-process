import { Action } from 'redux'
export declare type ReduxProcessAction<PayloadType> = Action<string> & {
  payload: PayloadType
}
export declare type ReduxProcessOptions = {}
