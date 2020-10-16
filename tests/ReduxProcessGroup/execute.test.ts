import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'
import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcessGroup::execute', function () {
  class Process extends ReduxProcess<string, number, number, number> {
    performAction(input: string) {
      return parseInt(input)
    }

    getNewState(payload: number) {
      return payload
    }
  }

  it('should throw error if ReduxProcess is not a part of the ReduxProcessGroup', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    this.assert.throws(() => {
      instance.execute(Process, '123')
    })
  })

  it('should return a function if ReduxProcess is a part of the ReduxProcessGroup', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [Process],
      defaultState: 0
    })

    this.assert.isFunction(instance.execute(Process, '123'))
  })

  it('should return value from the nested function', async function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [Process],
      defaultState: 0
    })

    const dispatchSpy = this.sinon.spy()
    const getStateSpy = this.sinon.stub().returns(0)
    const result = await instance.execute(Process, '123')(
      dispatchSpy,
      getStateSpy,
      null
    )

    this.assert.called(dispatchSpy)
    this.assert.called(getStateSpy)
    this.assert.equal(result, 123)
  })
})
