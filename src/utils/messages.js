const moment = require("moment")

generateMessage = (message) => {
	return {
		content: message,
		createdBy: 'User',
		createdAt: moment()
	}
}

generateLocation = (location) => {
	return {
		location,
		createdBy: 'User',
		createdAt: moment()
	}
}

module.exports = {
	generateMessage,
	generateLocation
}