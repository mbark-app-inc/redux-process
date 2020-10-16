const { ReduxProcess } = require('../../../../dist')

module.exports = class LogoutProcess extends ReduxProcess {
  performAction() {
    return true
  }

  getNewState(_, state) {
    return {
      ...state,
      user: null
    }
  }
}
