import { ReduxProcess } from '../../../src'
import { PostsState, Post } from './index'
import { RootState } from '../../store'

const posts: Post[] = [
  {
    id: 1,
    title: 'Post 1'
  },
  {
    id: 2,
    title: 'Post 2'
  },
  {
    id: 3,
    title: 'Post 3'
  }
]

export class AllPostsProcess extends ReduxProcess<
  null,
  Post[],
  PostsState,
  RootState
> {
  async performAction(): Promise<Post[]> {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(posts)
      }, 2000)
    })
  }

  getNewState(payload: Post[]) {
    return payload
  }
}
