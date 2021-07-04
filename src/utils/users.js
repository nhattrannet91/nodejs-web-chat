const users = []
const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();
  if (!username || !room) {
    return {
      error: "Username and room are required"
    }
  }

  if (users.find(x => x.username === username && x.room === room)) {
    return {
      error: "username is in use"
    }
  }

  let newUser = { id, username, room };
  users.push(newUser)
  return { user: newUser };
}

const removeUser = (id) => {
  const userIndex = users.findIndex(x => x.id === id)
  if (userIndex === -1) {
    return {
      error: "user doesn't exist"
    }
  }

  return {
    user: users.splice(userIndex, 1)[0]
  }
}

const getUser = (id) => {
  return users.find(x => x.id === id)
}


const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase()
  return users.filter(x => x.room === room)
}

module.exports = {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser
}