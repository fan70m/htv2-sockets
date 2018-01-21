function randomInteger(from, to) {
  return Math.round(Math.random() * (to - from)) + from
}

module.exports = {
  randomInteger,
}
