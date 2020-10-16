import { ReduxProcessGroup } from '../../src/ReduxProcessGroup'

describe('src/ReduxProcessGroup::getFormattedActionType', function () {
  it('should return a string', function () {
    const instance = new ReduxProcessGroup<number, number>('name', {
      processes: [],
      defaultState: 0
    })

    this.assert.equal(
      instance.getFormattedActionType('my-key'),
      `@redux-process-group/${'name'.toLowerCase()}/${'my-key'.toLowerCase()}`
    )
  })
})
