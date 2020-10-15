import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import auth, { AuthState } from './processes/Auth'
import posts, { PostsState } from './processes/Posts'

const middleware = applyMiddleware(thunk)

const reducers = combineReducers({
  auth: auth.getReducer(),
  posts: posts.getReducer()
})

export type RootState = {
  auth: AuthState
  posts: PostsState
}

export const store = createStore(reducers, middleware)
