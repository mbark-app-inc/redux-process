import { ReduxProcessStore } from '../../src/ReduxProcessStore'
import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'

describe('src/ReduxProcessStore::removeProcessGroup', function () {
  it('should remove ReduxProcessGroup from internal processes object', function () {
    const process = new ReduxProcessGroup('test', {
      defaultState: '',
      processes: []
    })
    const instance = new ReduxProcessStore()
    instance.addProcessGroup(process)

    this.assert.hasAllKeys(instance['processes'], ['test'])

    instance.removeProcessGroup(process)

    this.assert.deepEqual(instance['processes'], {})
  })

  it('should return instance of this', function () {
    const process = new ReduxProcessGroup('test', {
      defaultState: '',
      processes: []
    })
    const instance = new ReduxProcessStore()
    instance.addProcessGroup(process)
    const self = instance.removeProcessGroup(process)
    this.assert.equal(instance, self)
  })
})
