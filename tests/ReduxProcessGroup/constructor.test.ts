import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'

describe('src/ReduxProcessGroup::constructor', function () {
  it('should return instance of ReduxProcessGroup', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    this.assert.instanceOf(instance, ReduxProcessGroup)
  })

  it('should set options property', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    this.assert.isArray(instance.options.processes)
    this.assert.equal(instance.options.defaultState, 0)
  })
})
