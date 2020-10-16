const { ReduxProcess } = require('../../../../dist')

module.exports = class LoginProcess extends ReduxProcess {
  performAction(form) {
    return {
      id: 1,
      ...form,
      lastLogin: new Date()
    }
  }

  getNewState(payload, state) {
    return {
      ...state,
      user: payload
    }
  }
}
