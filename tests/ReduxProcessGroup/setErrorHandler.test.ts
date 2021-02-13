import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'
import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcessGroup::setErrorHandler', function () {
  class Process extends ReduxProcess<string, number, number, number> {
    performAction(input: string) {
      return parseInt(input)
    }

    getNewState(payload: number) {
      return payload
    }
  }

  it('should resolve', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [Process],
      defaultState: 0
    })
    instance.setErrorHandler(() => {})

    this.assert.isOk(instance['errorHandler'])
  })
})
