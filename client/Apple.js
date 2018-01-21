class Apple {
  constructor(apple) {
    this.x = apple.x
    this.y = apple.y
  }

  paint() {
    ctx.fillStyle = 'orangered'
    ctx.fillRect(this.x * 19, this.y * 19, 18, 18)
  }
}