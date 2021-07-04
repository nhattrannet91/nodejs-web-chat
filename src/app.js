const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require("path");
const { generateMessage, generateLocation } = require("./utils/messages")
const { addUser, getUser } = require("./utils/users")

const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, "../public")

app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on("connection", (socket) => {

  socket.on("join", ({ username, room }, callback) => {
    const res = addUser({
      id: socket.id,
      username,
      room
    })

    if(res.error){
      return callback(res.error)
    }

    const user = res.user;
    socket.join(user.room);
    socket.emit("message", generateMessage("Welcome!"))
    socket.broadcast.to(room).emit("message", generateMessage(`${user.username} has joined`))
    callback()
  })

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id)
    if(!user){
      return callback("User is invalid. Please reconnect")
    }

    io.to(user.room).emit("message", generateMessage(message))
    callback()
  })

  socket.on("sendLocation", (location, callback) => {
    const user = getUser(socket.id)
    if(!user){
      return callback("User is invalid. Please reconnect")
    }

    socket.broadcast.to(user.room).emit("location", generateLocation(location))
    callback()
  });
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})