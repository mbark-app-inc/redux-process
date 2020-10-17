# ReduxProcessGroup
The `ReduxProcessGroup` class is responsible for combining multiple `ReduxProcess` classes into a single group. This is used to generate the reducer, execute the actions, and maintain integrity of the redux suite.

## Overview

`ReduxProcessGroup` is a class that should be instantiated. If you are using typescript, there are 2 generics that must be provided at a class level.

```typescript
class ReduxProcessGroup<ProcessGroupState, GlobalState> ...
```

* `ProcessGroupState` - The full reducer state type as defined. The default state for the reducer should contain all keys that will be used at a top level. This ensures that the type is consistent going forward.
* `GlobalState` - The full type of the entire store state. This could be the same as `ProcessGroupState` or different dependent upon how many reducers are within the application.

### Arguments
* `name` - The name of the reducer. If there are multiple reducers in the application, we recommend providing a unique name for each reducer. This helps categorize the actions upon execution and enables easier debugging of the application.
* `options` - The options object contains a few required keys.
  * `defaultState` - The default state of the reducer. This should contain all top level keys within the application in accordance with the `ProcessGroupState` type used within the `ReduxProcess`.
  * `processes` - The processes are registered to he process group here. This ensures the reducer has the appropriate handlers. It also enables a `ReduxProcessGroup` the ability to execute a `ReduxProcess`.

## Example
```typescript
import { LoginProcess } from './LoginProcess' // A ReduxProcess sub-class
import { LogoutProcess } from './LogoutProcess' // A ReduxProcess sub-class
import { CurrentUserProcess } from './CurrentUserProcess' // A ReduxProcess sub-class

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

const auth = new ReduxProcessGroup<AuthState, RootState>('auth', {
  defaultState: {
    user: null
  },
  processes: [LoginProcess, LogoutProcess, CurrentUserProcess]
})
```

## Advanced

`ReduxProcessGroup` offers the ability to provide external values to each of the registered `ReduxProcess`. This could be used to mock out a demo service for the application or get dynamic details on the fly. In order to accomplish this, start by sub-classing `ReduxProcessGroup` and overriding `getReduxProcessOptions(store?: GlobalState): ReduxProcessOptions`. `ReduxProcessOptions` is an object that can be extended to include the needed keys for the expected values.

**Note:** `store` is provided when the action is executed, *NOT* when the reducer is executed. A conditional check should be done to ensure this value is present.

### Example
```typescript
class MyProcessGroup extends ReduxProcessGroup<AuthState, RootState> {
  getReduxProcessOptions(store?: GlobalState): ReduxProcessOptions {
    if (store) {
      return {
        isDemo: store.system.isDemo
      }
    }
    return super.getReduxProcessOptions()
  }
}

```
The class `MyProcessGroup` can now be used in place of `ReduxProcessGroup` where appropriate.
