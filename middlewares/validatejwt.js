const jwt = require('jsonwebtoken')
const User = require('../models/user')


const validateJWT = async(req, res, next) => {

	const token = req.header('x-token') || req.params

	if (!token) {
		res.status(401).json({
			msg: "There are no tokens in the header"
		})
	}

	try{

		const { uid } = jwt.verify( token, process.env.PRIVATEKEY )

		const user = await User.findById(uid)

		if (!user) {
			return res.status(400).json({
				msg: 'There are no users with that ID'
			})
		}

		//Verificar si el usuario está activo
		if (!user.estate) {
			return res.status(400).json({
				msg: "This user is innactive, can't do anything"
			})
		}

		req.authenticatedUser = user


		next()
	}catch(error){
		console.log(error)
		res.status(401).json({
			msg: 'Invalid token'
		})
	}
}

module.exports = {
	validateJWT
}