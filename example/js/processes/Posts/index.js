const { ReduxProcessGroup } = require('../../../../dist')
const AllPostsProcess = require('./All')

const posts = new ReduxProcessGroup('post', {
  defaultState: [],
  processes: [AllPostsProcess]
})

module.exports = posts
module.exports.AllPostsProcess = AllPostsProcess
