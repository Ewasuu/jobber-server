const User = require('../models/user')


const idExistsValidator = async(id) => {
	const emailExists = await User.findById( id )
	if (!emailExists) {

		throw new Error('There are not users with that ID')
	}
}

module.exports = {
	idExistsValidator
}