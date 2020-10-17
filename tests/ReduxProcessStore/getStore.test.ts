import { ReduxProcessStore } from '../../src/ReduxProcessStore'

describe('src/ReduxProcessStore::getStore', function () {
  it('should instance of the Store', function () {
    const instance = new ReduxProcessStore()

    this.assert.isObject(instance.getStore())
  })
})
