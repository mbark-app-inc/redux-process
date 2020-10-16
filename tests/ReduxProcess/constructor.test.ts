import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcess::constructor', function () {
  class Process extends ReduxProcess<string, number, number, number> {
    performAction(input: string) {
      return parseInt(input)
    }

    getNewState(payload: number) {
      return payload
    }
  }

  it('should return instance of type ReduxProcess', function () {
    const instance = new Process({})

    this.assert.instanceOf(instance, ReduxProcess)
  })

  it('should set options property', function () {
    const instance = new Process({})

    this.assert.deepEqual(instance.options, {})
  })
})
