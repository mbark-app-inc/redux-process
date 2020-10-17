import { ReduxProcessStore } from '../../dist'
import auth, { AuthState } from './processes/Auth'
import posts, { PostsState } from './processes/Posts'

const processStore = new ReduxProcessStore()
processStore.addProcessGroup(auth).addProcessGroup(posts)

export type RootState = {
  auth: AuthState
  posts: PostsState
}

export const store = processStore.getStore()
