import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'

describe('src/ReduxProcessGroup::getReduxProcessOptions', function () {
  it('should return the options', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    this.assert.deepEqual(instance.getReduxProcessOptions(), {})
  })
})
