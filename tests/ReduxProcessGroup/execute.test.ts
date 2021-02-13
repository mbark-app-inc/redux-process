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

  it('should handle error if error handler is set', async function () {
    class ErrorProcess extends ReduxProcess<string, number, number, number> {
      performAction(input: string) {
        throw new Error('invalid')

        return parseInt(input)
      }

      getNewState(payload: number) {
        return payload
      }
    }

    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [ErrorProcess],
      defaultState: 0
    })

    const dispatchSpy = this.sinon.spy()
    const getStateSpy = this.sinon.stub().returns(0)

    instance['errorHandler'] = this.sinon
      .stub()
      .returns(new Error('transformed')) as any

    try {
      const result = await instance.execute(ErrorProcess, '123')(
        dispatchSpy,
        getStateSpy,
        null
      )
      this.assert.isNull(result)
    } catch (e) {
      this.assert.instanceOf(e, Error)
    }

    this.assert.notCalled(dispatchSpy)
    this.assert.called(getStateSpy)
    this.assert.called(instance['errorHandler'] as any)
  })
})
