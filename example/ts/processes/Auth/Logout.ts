import { ReduxProcess } from '../../../../src'
import { AuthState } from './index'
import { RootState } from '../../store'

export class LogoutProcess extends ReduxProcess<
  null,
  true,
  AuthState,
  RootState
> {
  performAction(): true {
    return true
  }

  getNewState(_: true, state: AuthState) {
    return {
      ...state,
      user: null
    }
  }
}
