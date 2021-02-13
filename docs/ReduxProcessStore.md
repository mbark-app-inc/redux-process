# ReduxProcessStore
The `ReduxProcessStore` class is responsible registering reducers to the internal redux store. This enables dynamic reducers. They can be added or removed at any time.

## Overview

`ReduxProcessStore` is a class that should be instantiated.

### Arguments
* `middlewares` - An array of middlewares that should be registered to the redux internal store. `redux-thunk` is registered out of the box. This middleware helps facilitate functionality of `ts-redux-process`.

### Methods
```typescript
setErrorHandler(processGroup: ErrorHandler): void
```
* This method is responsible for transforming errors. Should you want to capture an error or remove auth tokens, it can be done here. Return a new Error if you'd like.

```typescript
addProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
```
* This method is responsible for dynamically loading a new reducer to the internal redux store. This can be performed at anytime throughout the lifecycle of the application.

```typescript
removeProcessGroup(processGroup: IReduxProcessGroup<any, any>): this
```
* This method is responsible for dynamically removing an existing reducer from the internal redux store. This can be performed at anytime throughout the lifecycle of the application.

```typescript
getStore(): Store<any, ReduxProcessAction<any>>
```
* This method is responsible for returning the internal redux store. This can be used as expected when implementing `redux`.

## Example
```typescript
import auth from './authProcessGroup' // A ReduxProcessGroup instance
import posts from './authProcessGroup' // A ReduxProcessGroup instance

const processStore = new ReduxProcessStore()
processStore.addProcessGroup(auth).addProcessGroup(posts)

const store = processStore.getStore()
```
