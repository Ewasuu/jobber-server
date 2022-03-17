const bcrypt = require('bcryptjs')

const User = require('../models/user')
const { generateJWT } = require('../helpers/generatejwt')
const { googleVerify } = require('../helpers/google-verify')

const login = async( req, res ) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !user.estate) {
    	console.log(user)
        return res.status(400).json({
        	success: false,
            msg: 'There are no users with that email',
        })
    }

    if (user.google) {
        return res.json.status(401).json({
        	success: false,
            msg: 'this account has been registred with google, use the google sign in'
        })
    }

    if (!user.confirmated) {
    	return res.status(401).json({
        	success: false,
    		msg: 'This account needs to be verified, please check your email'
    	})
    }

    const validPassword = bcrypt.compareSync( password, user.password )
    if (!validPassword) {
        return res.status(401).json({
        	success: false,
            msg: 'wrong password'
        })
    }

    const token = await generateJWT( user._id )

    res.json({
    	success: true,
        user,
        token
    })

}

const googleSignIn = async(req, res) => {
	const { id_token } = req.body

	try{

		const { correo, name, img } = await googleVerify(id_token)

		//Verificar que la cuenta no esté ya registrada
		let user = await User.findOne({ correo })

		if (!user) {
			const data = {
				name,
				email,
				password: '1qandLX-esteth@13CEQ',
				google: true,
				confirmated: true
			}

			user = new User( data )

			await user.save()
		}

		const token = await generateJWT( user.id )

		res.json({
			success: true,
			user,
			token
		})

	} catch(error){
		console.log(error)
		res.status(400).json({
			msg: 'Something went wrong, please try again later'
		})
	}
}

module.exports = {
    login,
    googleSignIn
}