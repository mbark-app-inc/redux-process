import { ReduxProcessGroup } from '../../../../dist'
import { AllPostsProcess } from './All'
import { RootState } from '../../store'

export type Post = {
  id: number
  title: string
}

export type PostsState = Post[]

const auth = new ReduxProcessGroup<PostsState, RootState>('posts', {
  defaultState: [],
  processes: [AllPostsProcess]
})

export default auth
export { AllPostsProcess }
