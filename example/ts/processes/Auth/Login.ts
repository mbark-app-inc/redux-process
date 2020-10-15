import { ReduxProcess } from '../../../../src'
import { AuthState, User } from './index'
import { RootState } from '../../store'

export type LoginForm = {
  username: string
  password: string
}

export class LoginProcess extends ReduxProcess<
  LoginForm,
  User,
  AuthState,
  RootState
> {
  performAction(form: LoginForm): User {
    return {
      id: 1,
      ...form,
      lastLogin: new Date()
    }
  }

  getNewState(payload: User, state: AuthState) {
    return {
      ...state,
      user: payload
    }
  }
}
