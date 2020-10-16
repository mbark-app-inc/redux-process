const store = require('./store')
const auth = require('./processes/Auth')
const posts = require('./processes/Posts')
const ThunkAction = require('redux-thunk')

async function dispatchAsyncWithErrorBoundry(process) {
  console.log('--------Begin execution--------')
  console.log(store.getState())

  try {
    await store.dispatch(process)
  } catch (e) {
    console.error(e)
  }

  console.log(store.getState())
  console.log('--------End execution--------')
}

async function main() {
  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(auth.execute(auth.CurrentUserProcess))
  )

  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(
      auth.execute(auth.LoginProcess, {
        username: 'foo',
        password: 'bar'
      })
    )
  )

  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(auth.execute(auth.CurrentUserProcess))
  )

  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(posts.execute(posts.AllPostsProcess))
  )

  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(auth.execute(auth.LogoutProcess))
  )
}

main()
