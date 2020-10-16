const { ReduxProcessGroup } = require('../../../../dist')
const LoginProcess = require('./Login')
const LogoutProcess = require('./Logout')
const CurrentUserProcess = require('./Current')

const auth = new ReduxProcessGroup('auth', {
  defaultState: {
    user: null
  },
  processes: [LoginProcess, LogoutProcess, CurrentUserProcess]
})

module.exports = auth
module.exports.LoginProcess = LoginProcess
module.exports.LogoutProcess = LogoutProcess
module.exports.CurrentUserProcess = CurrentUserProcess
