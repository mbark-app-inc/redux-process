import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcess:getProcessKey', function () {
  it('should return random string', function () {
    const key = ReduxProcess.getProcessKey()
    this.assert.isString(key)
  })
})
