const world = require('./world.js')
const { randomInteger } = require('./helpers.js')

class Apple {
  constructor() {
    this.reposition()
  }

  reposition() {
    // Generate a random x and y position
    this.x = randomInteger(0, world.width)
    this.y = randomInteger(0, world.height)
    return true
  }

  serialize() {
    return {
      x: this.x,
      y: this.y,
    }
  }
}

module.exports = Apple
