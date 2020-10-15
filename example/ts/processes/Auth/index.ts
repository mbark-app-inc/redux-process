import { ReduxProcessGroup } from '../../../../src'
import { LoginProcess } from './Login'
import { LogoutProcess } from './Logout'
import { CurrentUserProcess } from './Current'
import { RootState } from '../../store'

export type User = {
  id: number
  username: string
  password: string
  lastLogin: Date
}

export type AuthState = {
  user: User | null
}

const auth = new ReduxProcessGroup<AuthState, RootState>('auth', {
  defaultState: {
    user: null
  },
  processes: [LoginProcess, LogoutProcess, CurrentUserProcess]
})

export default auth
export { LoginProcess, LogoutProcess, CurrentUserProcess }
