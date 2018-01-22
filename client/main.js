import io from 'socket.io-client'
import { keyCodeToDirection } from './helpers.js'
import Player from './Player.js'
import Apple from './Apple.js'

const socket = io()
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

document.body.appendChild(canvas)

let world = {}
let players = []
let apples = []
let direction = ''

socket.on('tick', data => {
  world = data.world
  players = data.players.map((player) => new Player(player, {
    isOwnedByPlayer: player.id === socket.id,
  }))
  apples = data.apples.map((apple) => new Apple(apple))
  paint()
})

window.addEventListener('keydown', event => {
  let newDirection = keyCodeToDirection(event.keyCode)
  if (newDirection && direction !== newDirection) {
    direction = newDirection
    socket.emit('setDirection', {
      direction
    })
  }
})

function paint() {
  canvas.width = world.width * 19
  canvas.height = world.height * 19
  ctx.fillStyle = 'darkslategray'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  apples.forEach(apple => apple.paint(ctx))
  players.forEach(player => player.paint(ctx))
}
