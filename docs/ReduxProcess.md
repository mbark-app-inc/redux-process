# ReduxProcess
The `ReduxProcess` class is responsible for pairing a redux action with the specific reducer code for said action. This means the action and the reducer portion for the specific action can live together in a single, highly maintainable location. This reduces the confusion around separate reducer and action locations in a project.

## Overview

`ReduxProcess` is an abstract class that must be sub-classed. If you are using typescript, there are 4 generics that must be provided at a class level.

```typescript
class ReduxProcess<
  Form,
  PayloadValue,
  ProcessGroupState,
  GlobalState
> ...
```

* `Form`- Any information that is provided when the action is executed. This is in the form of a payload. (e.g. form data when the submit button is pressed)
* `PayloadValue` - The output type of the action portion. This is also the payload provided to the reducer when the action is executed internally. (e.g. `dispatch({ type: 'my-action', payload: <this value type> })`)
* `ProcessGroupState` - The full reducer state type as defined. The default state for the reducer should contain all keys that will be used at a top level. This ensures that the type is consistent going forward.
* `GlobalState` - The full type of the entire store state. This could be the same as `ProcessGroupState` or different dependent upon how many reducers are within the application.

### Methods

Once `ReduxProcess` has been sub-classed two methods must be implemented.
```typescript
performAction(form: Form, store: GlobalState): PayloadValue | Promise<PayloadValue>
```
 * This method is performed when the process is dispatched. This would traditionally be called the action. In here, data should be fetched, objects should be updated, and the new values should be returned.

```typescript
getNewState(payload: PayloadValue, oldState: ProcessGroupState): ProcessGroupState
```
* This method is the reducer specific code for the defined action above. This would traditionally be the code executed within the reducer for the specific `action.type`. In here, a new state object should be returned.

### Properties
* `options` - Options will contain any provided options from an overwritten `ReduxProcessGroup` class. See [ReduxProcessGroup docs](https://github.com/Olencki-Development/redux-process/blob/main/docs/ReduxProcessGroup.md#advanced) for more information.

## Example
```typescript
type User = {
  id: number
  username: string
  lastLogin: Date
}

type AuthState = {
  user: User | null
}

type RootState = {
  auth: AuthState
}

type LoginForm = {
  username: string
  password: string
}

class LoginProcess extends ReduxProcess<
  LoginForm,
  User,
  AuthState,
  RootState
> {
  async performAction(form: LoginForm): Promise<User> {
    const user = await fetchUser() // fetch user from server, code not implemented for the example
    return user
  }

  getNewState(payload: User, state: AuthState) {
    return {
      ...state,
      user: payload
    }
  }
}
```
