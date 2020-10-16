import * as chai from 'chai'

type ChaiAssert = Chai.Assert

const chaiAssert = chai.assert

declare module 'mocha' {
  export interface Context {
    assert: ChaiAssert
  }
}

before(function () {
  this.assert = chaiAssert
})
