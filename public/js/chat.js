const socket = io()
socket.on("message", (message) => {
    console.log("Server response: ", message)
})