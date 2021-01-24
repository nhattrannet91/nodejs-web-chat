const socket = io()
const messageTxt = document.querySelector("#messageTxt")
const submitBtn = document.querySelector("#submitBtn")

socket.on("message", (message) => {
    console.log("Server response: ", message)
})

submitBtn.addEventListener("click", () => {
    socket.emit("sendMessage", messageTxt.value)
})