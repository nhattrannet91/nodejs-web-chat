const moment = require("moment")

generateMessage = (message) => {
	return {
		content: message,
		createdBy: 'User',
		createdAt: moment()
	}
}

module.exports = {
	generateMessage
}