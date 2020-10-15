import { ReduxProcess } from '../../../src'
import { AuthState, User } from './index'
import { RootState } from '../../store'

export class CurrentUserProcess extends ReduxProcess<
  null,
  User,
  AuthState,
  RootState
> {
  performAction(_: null, state: RootState): User {
    let user = state.auth.user
    if (!user) {
      throw new Error('User is not logged in.')
    }
    user.lastLogin = new Date()
    return user
  }

  getNewState(payload: User, state: AuthState) {
    return {
      ...state,
      user: payload
    }
  }
}
