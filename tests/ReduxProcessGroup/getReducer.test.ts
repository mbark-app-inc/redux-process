import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'
import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcessGroup::getReducer', function () {
  class Process extends ReduxProcess<string, number, number, number> {
    performAction(input: string) {
      return parseInt(input)
    }

    getNewState(payload: number) {
      return payload
    }
  }

  it('should return a function', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [Process],
      defaultState: 0
    })

    this.assert.isFunction(instance.getReducer())
  })

  it('should set state if state is not provided', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    const reducer = instance.getReducer()
    const result = reducer(undefined, {
      type: 'asdf',
      payload: 123
    })

    this.assert.equal(result, 0)
  })

  it('should return state if action.type is not found', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    const reducer = instance.getReducer()
    const result = reducer(1234, {
      type: 'asdf',
      payload: 123
    })

    this.assert.equal(result, 1234)
  })

  it('should return new state if action.type is found', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [Process],
      defaultState: 0
    })

    const reducer = instance.getReducer()
    const result = reducer(1234, {
      type: instance.getFormattedActionType(Process.getProcessKey()),
      payload: 123
    })

    this.assert.equal(result, 123)
  })
})
