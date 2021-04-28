import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'
import { ReduxProcess } from '../../src/ReduxProcess'

describe('src/ReduxProcessGroup::getFormattedActionType', function () {
  it('should return a string', function () {
    class MyProcess extends ReduxProcess<any, any, any, any> {
      getNewState() {
        return {}
      }

      performAction() {
        return {}
      }
    }

    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    const value = instance.getFormattedActionType(MyProcess)
    this.assert.isString(value)

    const value2 = instance.getFormattedActionType(MyProcess)
    this.assert.equal(value2, value)
  })
})
