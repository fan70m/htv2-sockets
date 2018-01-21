class Player {
  constructor(player) {
    this.id = player.id
    this.pieces = player.pieces.map((piece, i) =>
      new PlayerPiece(player.id, piece, i == player.pieces.length - 1)
    );
  }

  paint() {
    this.pieces.forEach(piece => piece.paint())
  }
}
