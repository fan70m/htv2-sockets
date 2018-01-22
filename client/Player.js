import PlayerPiece from './PlayerPiece'

export default class Player {
  constructor(player, {
    isOwnedByPlayer
  }) {
    this.pieces = player.pieces.map((piece, i) =>
      new PlayerPiece(piece, {
        isHead: i == player.pieces.length - 1,
        isOwnedByPlayer,
      })
    )
  }

  paint(ctx) {
    this.pieces.forEach(piece => piece.paint(ctx))
  }
}
