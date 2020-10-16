const { ReduxProcess } = require('../../../../dist')

const posts = [
  {
    id: 1,
    title: 'Post 1'
  },
  {
    id: 2,
    title: 'Post 2'
  },
  {
    id: 3,
    title: 'Post 3'
  }
]

module.exports = class AllPostsProcess extends ReduxProcess {
  async performAction() {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve(posts)
      }, 2000)
    })
  }

  getNewState(payload) {
    return payload
  }
}
