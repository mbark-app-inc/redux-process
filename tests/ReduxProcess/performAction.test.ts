import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcess::performAction', function () {
  class Process extends ReduxProcess<string, number, number, number> {
    performAction(input: string) {
      return parseInt(input)
    }

    getNewState(payload: number) {
      return payload
    }
  }

  it('should return value', function () {
    const instance = new Process({})

    const result = instance.performAction('123')
    this.assert.equal(result, 123)
  })
})
