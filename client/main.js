const socket = io('http://192.168.0.26:3002');

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let world = {}
let players = []
let apples = []
let direction = ''

socket.on('tick', (data) => {
  world = data.world
  players = data.players.map((player) => new Player(player))
  apples = data.apples.map((apple) => new Apple(apple))
  paint()
})

window.addEventListener('keydown', (event) => {
  let newDirection = keyCodeToDirection(event.keyCode)
  if (newDirection && direction !== newDirection) {
    direction = newDirection
    socket.emit('setDirection', {
      direction
    })
  }
})

function paint() {
  canvas.width = (world.width + 1) * 19
  canvas.height = (world.height + 1) * 19
  ctx.fillStyle = 'darkslategray'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  apples.forEach(apple => apple.paint())
  players.forEach(player => player.paint())
}

function keyCodeToDirection(keyCode) {
  switch(event.keyCode) {
    case 87: // w
    case 38: // up
      return 'up'

    case 68: // d
    case 39: // right
      return 'right'

    case 83: // s
    case 40: // down
      return 'down'

    case 65: // a
    case 37: // left
      return 'left'
  }
}
