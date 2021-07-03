const moment = require("moment")
const Filter = require('bad-words'),
	filter = new Filter()


generateMessage = (message) => {
	return {
		content: filter.clean(message),
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