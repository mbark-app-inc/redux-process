const { ReduxProcessGroup } = require('../../../../dist')
const AllPostsProcess = require('./All')

const posts = new ReduxProcessGroup('posts', {
  defaultState: [],
  processes: [AllPostsProcess]
})

module.exports = posts
module.exports.AllPostsProcess = AllPostsProcess
