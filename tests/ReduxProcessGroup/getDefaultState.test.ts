import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'

describe('src/ReduxProcessGroup::getDefaultState', function () {
  it('should return the default state', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    this.assert.equal(instance.getDefaultState(), 0)
  })
})
