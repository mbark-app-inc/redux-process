import { ReduxProcessStore } from '../../src/ReduxProcessStore'

describe('src/ReduxProcessStore::constructor', function () {
  it('should return instance of type ReduxProcessStore', function () {
    const instance = new ReduxProcessStore()

    this.assert.instanceOf(instance, ReduxProcessStore)
  })
})
