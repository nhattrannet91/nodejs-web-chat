const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require("path");

const port = process.env.PORT || 3000
const publicDirectory = path.join(__dirname, "../public")

app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

io.on("connection", (socket) => {
  socket.emit("message", "Welcome!")
  socket.on("sendMessage", (message) => {
    io.emit("message", `Receive message: ${message}`)
  })

  socket.on("sendLocation", (location, callback) => {
    socket.broadcast.emit("message", `Someone has joined with us (lat: ${location.latitude}, long: ${location.longitude})`)
    callback("Location Shared!")
  });
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})