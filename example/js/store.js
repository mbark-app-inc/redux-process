const thunk = require('redux-thunk')
const { createStore, applyMiddleware, combineReducers } = require('redux')
const auth = require('./processes/Auth')
const posts = require('./processes/Posts')

const middleware = applyMiddleware(thunk.default)

const reducers = combineReducers({
  auth: auth.getReducer(),
  posts: posts.getReducer()
})

module.exports = createStore(reducers, middleware)
