const world = require('./world.js')
const PlayerPiece = require('./PlayerPiece.js')
const { randomInteger } = require('./helpers.js')

class Player {
  constructor(id) {
    this.id = id
    // Generate a random x and y position not too close to the edge
    const x = randomInteger(4, world.width - 4)
    const y = randomInteger(4, world.height - 4)
    this.pieces = [
      new PlayerPiece(x, y),
    ]
    this.direction = 'right'
    this.nextDirection = null
  }

  get dx() {
    switch (this.direction) {
      case 'up': return 0
      case 'right': return 1
      case 'down': return 0
      case 'left': return -1
    }
  }

  get dy() {
    switch (this.direction) {
      case 'up': return -1
      case 'right': return 0
      case 'down': return 1
      case 'left': return 0
    }
  }

  move() {
    const head = this.head()
    this.pieces.shift()
    const x = Math.min(Math.max(head.x + this.dx, 0), world.width - 1)
    const y = Math.min(Math.max(head.y + this.dy, 0), world.height - 1)
    this.pieces.push(new PlayerPiece(x, y))
    if (this.nextDirection) {
      this.direction = this.nextDirection
      this.nextDirection = null
    }
  }

  grow() {
    const head = this.head()
    const x = Math.min(Math.max(head.x + this.dx, 0), world.width - 1)
    const y = Math.min(Math.max(head.y + this.dy, 0), world.height - 1)
    this.pieces.push(new PlayerPiece(x, y))
    if (this.nextDirection) {
      this.direction = this.nextDirection
      this.nextDirection = null
    }
  }

  head() {
    return this.pieces[this.pieces.length - 1]
  }

  setDirection(direction) {
    if (
      direction === 'up' && this.direction === 'down' ||
      direction === 'right' && this.direction === 'left' ||
      direction === 'down' && this.direction === 'up' ||
      direction === 'left' && this.direction === 'right'
    ) {
      return
    }
    this.nextDirection = direction
  }

  serialize() {
    return {
      id: this.id,
      pieces: this.pieces.map(piece => piece.serialize())
    }
  }
}
  
module.exports = Player
