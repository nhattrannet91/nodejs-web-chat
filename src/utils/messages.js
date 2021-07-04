const moment = require("moment")
const Filter = require('bad-words'),
	filter = new Filter()


generateMessage = (message, user) => {
	return {
		content: filter.clean(message),
		createdBy: user || '',
		createdAt: moment()
	}
}

generateLocation = (location, user) => {
	return {
		location,
		createdBy: user,
		createdAt: moment()
	}
}

module.exports = {
	generateMessage,
	generateLocation
}