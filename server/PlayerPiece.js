class PlayerPiece {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  isCollidingWith(playerPiece) {
    return this !== playerPiece &&
      this.x === playerPiece.x &&
      this.y === playerPiece.y
  }

  serialize() {
    return {
      x: this.x,
      y: this.y,
    }
  }
}

module.exports = PlayerPiece
