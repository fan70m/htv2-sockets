// Start web socket server on port 3002
const io = require('socket.io')(3002);
const world = require('./world.js')
const Player = require('./Player.js');
const PlayerPiece = require('./PlayerPiece.js');
const Apple = require('./Apple.js');
// `players` is a Map mapping client `socket.id` to an instance of `Player`
const players = new Map();
// `apples` is an array of instances of `Apple`
const apples = [];

// When a client connects to the web socket server
io.on('connect', (socket) => {
  // Instantiate an instance `Player` for the new client
  players.set(socket.id, new Player(socket.id));
  
  // Add a new `Apple` to the world
  apples.push(new Apple());
  
  // When the client wants to change direction (clicks arrow keys)
  socket.on('setDirection', (data) => {
    const player = players.get(socket.id)
    // If the player is dead
    if (!player) {
      return;
    }
    // Change direction so that in the next tick they move in that direction
    player.setDirection(data.direction)
  })
  
  // When the client disconnects from the server
  socket.on('disconnect', () => {
    const player = players.get(socket.id)
    // If the player is dead
    if (!player) {
      return;
    }
    // Remove the player from the world
    players.delete(socket.id)
    // Remove an apple from the world
    apples.pop()
  })
})

setInterval(gameTick, 1000 / 8)

function gameTick() {
  // Convert `players` Map to an array of `Player`
  const playersArray = Array.from(players.values())

  playersArray.forEach(player => {
    const head = player.head()

    // If the player's head collided with an apple
    const didEatApple = apples.some((apple) => {
      if (head.x === apple.x && head.y === apple.y) {
        // Change the apple's position in the world
        apple.reposition()
        return true
      }
      return false
    })

    if (didEatApple) {
      player.grow()
    } else {
      player.move()
    }

    // Whether or not the player's head collided with another player piece in
    // the world
    const didCollideWithPlayerPiece = playersArray.some(aPlayer => {
      return aPlayer.pieces.some(piece => {
        return head !== piece && head.x === piece.x && head.y === piece.y
      })
    })

    if (didCollideWithPlayerPiece) {
      // Remove the player from the world
      players.delete(player.id)
      // Remove an apple from the world
      apples.pop()
    }
  })

  // Broadcast game information to all players
  io.emit('tick', {
    world,
    players: playersArray.map((player) => player.serialize()),
    apples,
  })
}
