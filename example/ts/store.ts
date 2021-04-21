import { ReduxProcessStore } from '../../dist'
import auth, { AuthState } from './processes/Auth'
import posts, { PostsState } from './processes/Posts'

export type RootState = {
  auth: AuthState
  posts: PostsState
}

const processStore = new ReduxProcessStore<RootState>()
processStore.addProcessGroup(auth).addProcessGroup(posts)

export const store = processStore.getStore()
