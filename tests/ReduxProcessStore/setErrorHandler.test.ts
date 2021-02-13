import { ReduxProcessStore } from '../../src/ReduxProcessStore'

describe('src/ReduxProcessStore::setErrorHandler', function () {
  it('should set error handler property', function () {
    const instance = new ReduxProcessStore()

    instance.setErrorHandler(() => {})

    this.assert.isOk(instance['errorHandler'])
  })
})
