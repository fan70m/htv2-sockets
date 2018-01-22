export default class PlayerPiece {
  constructor(piece, {
    isHead,
    isOwnedByPlayer
  }) {
    this.x = piece.x
    this.y = piece.y
    this.isHead = isHead
    this.isOwnedByPlayer = isOwnedByPlayer
  }

  paint(ctx) {
    ctx.fillStyle = this.isOwnedByPlayer
      ? (this.isHead ? 'gold' : 'yellow')
      : (this.isHead ? 'darkgreen' : 'forestgreen')
    ctx.fillRect(this.x * 19, this.y * 19, 18, 18)
  }

}