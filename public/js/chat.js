const socket = io()

// Elements
const $messageTxt = document.querySelector("#messageTxt")
const $submitBtn = document.querySelector("#submitBtn")
const $messages = document.querySelector("#messages")
const $sendLocation = document.querySelector("#sendLocationBtn")

// Templates
const messageTemplate = document.querySelector("#message-template")
const locationTemplate = document.querySelector("#location-template")

socket.on("message", (message) => {
    const html = Mustache.render(messageTemplate.innerHTML, {
        content: message.content,
        author: message.createdBy,
        createdAt: moment(message.createdAt).format("HH:mm")
    })
    $messages.insertAdjacentHTML("beforeend", html)
})

socket.on("location", (message) => {
    const html = Mustache.render(locationTemplate.innerHTML, {
        lat: message.location.latitude,
        long: message.location.longitude,
        author: message.createdBy,
        createdAt: moment(message.createdAt).format("HH:mm")
    })
    $messages.insertAdjacentHTML("beforeend", html)
})

$submitBtn.addEventListener("click", () => {
    $submitBtn.disabled = true
    socket.emit("sendMessage", $messageTxt.value, (error) => {
        $submitBtn.disabled = false;
        if (error) {
            alert(error)
        }
    })
})

$sendLocation.addEventListener("click", () => {
    if (!navigator.geolocation) {
        alert("Geolocation is not available")
    }

    $sendLocation.disabled = true
    navigator.geolocation.getCurrentPosition(position => {
        socket.emit("sendLocation",
            { latitude: position.coords.latitude, longitude: position.coords.longitude },
            error => {
                $sendLocation.disabled = false
                if (error) {
                    alert(error)
                }
            })
    });
})