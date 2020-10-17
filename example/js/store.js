const { ReduxProcessStore } = require('../../dist')
const auth = require('./processes/Auth')
const posts = require('./processes/Posts')

const processStore = new ReduxProcessStore()
processStore
  .addProcessGroup(auth)
  .addProcessGroup(posts)

module.exports = processStore.getStore()
