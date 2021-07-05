const socket = io()

// Elements
const $messageTxt = document.querySelector("#messageTxt")
const $submitBtn = document.querySelector("#submitBtn")
const $messages = document.querySelector("#messages")
const $sendLocation = document.querySelector("#sendLocationBtn")

// Templates
const messageTemplate = document.querySelector("#message-template")
const locationTemplate = document.querySelector("#location-template")

errorHandling = (error) => {
    if(error){
        alert(error)
    }
}

const {username, room} = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.emit("join", {username, room}, error => {
    if(error){
        alert(error)
        location.href = '/'
    }
})

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
        errorHandling(error)
        $submitBtn.disabled = false
        $messageTxt.value = null
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
                errorHandling(error)
                $sendLocation.disabled = false
            })
    });
})
