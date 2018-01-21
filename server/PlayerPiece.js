class PlayerPiece {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  serialize() {
    return {
      x: this.x,
      y: this.y,
    }
  }
}

module.exports = PlayerPiece
