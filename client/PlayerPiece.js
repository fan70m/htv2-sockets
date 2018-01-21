class PlayerPiece {
  constructor(playerId, piece, isHead) {
    this.playerId = playerId
    this.x = piece.x
    this.y = piece.y
    this.isHead = isHead
  }

  paint() {
    ctx.fillStyle = socket.id === this.playerId
      ? (this.isHead ? 'gold' : 'yellow')
      : (this.isHead ? 'darkgreen' : 'forestgreen')
    ctx.fillRect(this.x * 19, this.y * 19, 18, 18)
  }
}
