const bcryptjs = require('bcryptjs')


const { generateJWT } = require('../helpers/generatejwt')
const User = require('../models/user')
const {
    sendEmail,
    getTemplate
} = require('../config/mail.config.js')

const createUser = async( req, res ) => {

    const { name, email, password } = req.body

    const existsUser = await User.findOne( { email } )
    if (existsUser) {
        return res.status(400).json({
            success: false,
            msg: 'That email is already been used'
        })
    }


    const user = new User({
        name,
        email,
        password
    })

    const salt = bcryptjs.genSaltSync()
	user.password = bcryptjs.hashSync( password, salt )

    const token = await generateJWT( user._id )

    const path = `http://localhost:3000/api/user/${token}`

    const template = getTemplate( user.name, path )

    const subject = 'Confirm Your Accout!!'

    await sendEmail( user.email, subject, template )

    await user.save()


    res.json({
        success: true,
        user
    })

}

const updateUser = async( req, res ) => {

    const { password, email, google, estate, confirmated, ...rest } = req.body
    const { authenticatedUser } = req


    if (password) {

        const salt = bcryptjs.genSaltSync()
        rest.password = bcryptjs.hashSync( password, salt )


    }


    const user = await User.findByIdAndUpdate( authenticatedUser._id, rest)


    res.json({
        success: true,
        user
    })
}

const confirmAccount = async( req, res ) => {

    const { authenticatedUser } = req



    try{

        const user = await User.findByIdAndUpdate(authenticatedUser._id, { confirmated: true })

        res.json({
            success: true,
            user
        })

    } catch(err){
        return res.status(500).json({
            success: false,
            msg: 'Something went wrong, please try again later'
        })
    }

}

const sendConfirmationEmailAgain = async(req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({
            success: false,
            msg: 'Something went wrong, please try again later'
        })
    }

    const token = generateJWT( user.uid )

    const template = getTemplate( user.name, token )

    const subject = 'Confirm Your Accout!!'

    await sendEmail( email, subject, template )


    res.json({
        success: true,
        msg: 'Your accout has been successfully confirmed',
        email
    })


}

module.exports = {
    createUser,
    updateUser,
    confirmAccount,
    sendConfirmationEmailAgain
}