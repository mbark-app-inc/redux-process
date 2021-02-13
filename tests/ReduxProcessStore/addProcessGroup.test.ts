import { ReduxProcessStore } from '../../src/ReduxProcessStore'
import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'

describe('src/ReduxProcessStore::addProcessGroup', function () {
  it('should add ReduxProcessGroup to internal processes object', function () {
    const process = new ReduxProcessGroup('test', {
      defaultState: '',
      processes: []
    })
    const instance = new ReduxProcessStore()

    this.assert.deepEqual(instance['processes'], {})

    instance.addProcessGroup(process)

    this.assert.hasAllKeys(instance['processes'], ['test'])
  })

  it('should return instance of this', function () {
    const process = new ReduxProcessGroup('test', {
      defaultState: '',
      processes: []
    })
    const instance = new ReduxProcessStore()
    const self = instance.addProcessGroup(process)
    this.assert.equal(instance, self)
  })

  it('should return instance of this if error handler is set', function () {
    const process = new ReduxProcessGroup('test', {
      defaultState: '',
      processes: []
    })
    const instance = new ReduxProcessStore()
    instance.setErrorHandler(() => {})
    const self = instance.addProcessGroup(process)
    this.assert.equal(instance, self)
  })
})
