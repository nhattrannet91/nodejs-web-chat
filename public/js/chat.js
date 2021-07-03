const socket = io()
const messageTxt = document.querySelector("#messageTxt")
const submitBtn = document.querySelector("#submitBtn")

socket.on("message", (message) => {
    console.log("Server response: ", message)
})

submitBtn.addEventListener("click", () => {
    socket.emit("sendMessage", messageTxt.value)
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