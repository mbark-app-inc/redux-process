const { ReduxProcess } = require('../../../../dist')

module.exports = class CurrentUserProcess extends ReduxProcess {
  performAction(_, state) {
    let user = state.auth.user
    if (!user) {
      throw new Error('User is not logged in.')
    }
    user.lastLogin = new Date()
    return user
  }

  getNewState(payload, state) {
    return {
      ...state,
      user: payload
    }
  }
}
