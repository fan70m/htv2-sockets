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
    ];
    this.dx = 1
    this.dy = 0
  }

  move() {
    const head = this.head()
    this.pieces.shift()
    const x = Math.min(Math.max(head.x + this.dx, 0), world.width)
    const y = Math.min(Math.max(head.y + this.dy, 0), world.height)
    this.pieces.push(new PlayerPiece(x, y))
  }

  grow() {
    const head = this.head()
    const x = Math.min(Math.max(head.x + this.dx, 0), world.width)
    const y = Math.min(Math.max(head.y + this.dy, 0), world.height)
    this.pieces.push(new PlayerPiece(x, y))
  }

  head() {
    return this.pieces[this.pieces.length - 1]
  }

  setDirection(direction) {
    if (
      direction === 'up' && this.dy === 1 ||
      direction === 'right' && this.dx === -1 ||
      direction === 'down' && this.dy === -1 ||
      direction === 'left' && this.dx === 1
    ) {
      return;
    }
    this.dx = this.dy = 0;
    switch (direction) {
      case 'up': this.dy = -1; break;
      case 'right': this.dx = 1; break;
      case 'down': this.dy = 1; break;
      case 'left': this.dx = -1; break;
    }
  } 

  serialize() {
    return {
      id: this.id,
      pieces: this.pieces.map(piece => piece.serialize())
    }
  }
}
  
module.exports = Player
