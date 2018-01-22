function randomInteger(from, to) {
  return Math.round(Math.random() * (to - from - 1)) + from
}

module.exports = {
  randomInteger,
}
