const socket = io()

// Elements
const $messageTxt = document.querySelector("#messageTxt")
const $submitBtn = document.querySelector("#submitBtn")
const $messages = document.querySelector("#messages")

// Templates
const messageTemplate = document.querySelector("#message-template")

socket.on("message", (message) => {
    const html = Mustache.render(messageTemplate.innerHTML, {
        content: message
    })
    $messages.insertAdjacentHTML("beforeend", html)
})

$submitBtn.addEventListener("click", () => {
    socket.emit("sendMessage", $messageTxt.value)
})

document.querySelector("#sendLocationBtn").addEventListener("click", () => {
    if(!navigator.geolocation) {
        alert("Geolocation is not available")
    }

    navigator.geolocation.getCurrentPosition(position => {
        socket.emit("sendLocation", 
            {latitude: position.coords.latitude, longitude: position.coords.longitude},
            message => console.log(message))
    });
})