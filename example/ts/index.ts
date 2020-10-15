import { store } from './store'
import auth, {
  LoginProcess,
  CurrentUserProcess,
  LogoutProcess
} from './processes/Auth'
import posts, { AllPostsProcess } from './processes/Posts'
import { ThunkAction } from 'redux-thunk'

async function dispatchAsyncWithErrorBoundry(
  process: ThunkAction<any, any, any, any>
) {
  console.log('--------Begin execution--------')
  console.log(store.getState())

  try {
    const dispatchAsync = store.dispatch as any
    await dispatchAsync(process)
  } catch (e) {
    console.error(e)
  }

  console.log(store.getState())
  console.log('--------End execution--------')
}

async function main() {
  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(auth.execute(CurrentUserProcess))
  )

  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(
      auth.execute(LoginProcess, {
        username: 'foo',
        password: 'bar'
      })
    )
  )

  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(auth.execute(CurrentUserProcess))
  )

  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(posts.execute(AllPostsProcess))
  )

  await dispatchAsyncWithErrorBoundry((dispatch) =>
    dispatch(auth.execute(LogoutProcess))
  )
}

main()
