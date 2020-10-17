import { ReduxProcessStore } from '../../src/ReduxProcessStore'
import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'
import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcessStore::internalReducer', function () {
  class Process extends ReduxProcess<string, number, number, number> {
    performAction(input: string) {
      return parseInt(input)
    }

    getNewState(payload: number) {
      return payload
    }
  }

  it('should handle state update', function () {
    const process = new ReduxProcessGroup('test', {
      defaultState: 0,
      processes: [Process]
    })
    const instance = new ReduxProcessStore()
    instance.addProcessGroup(process)

    const _internalReducer = instance['_internalReducer']

    const state = _internalReducer(undefined, {
      type: process.getFormattedActionType(Process.getProcessKey()),
      payload: 2
    })

    this.assert.deepEqual(state, {
      test: 2
    })
  })
})
