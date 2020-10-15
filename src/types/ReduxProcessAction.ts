import { Action } from 'redux'

export type ReduxProcessAction<PayloadType> = Action<string> & {
  payload: PayloadType
}
