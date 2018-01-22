class World {
  constructor() {
    this.width = 30
    this.height = 30
  }

  serialize() {
    return {
      width: this.width,
      height: this.height,
    }
  }
}

const world = new World()

module.exports = world
