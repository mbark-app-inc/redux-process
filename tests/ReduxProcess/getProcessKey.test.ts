import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcess:getProcessKey', function () {
  it('should return constructor name', function () {
    const key = ReduxProcess.getProcessKey()
    this.assert.equal(key, 'ReduxProcess')
  })
})
