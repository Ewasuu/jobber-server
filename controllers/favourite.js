const User = require('../models/user')

const addFavourite = async( req, res ) => {
    
    const { authenticatedUser } = req
    const { favourite } = req.body

    try {
        authenticatedUser.favourites.push(favourite)
        await User.findByIdAndUpdate(authenticatedUser._id, authenticatedUser)

        const user = await User.findById(authenticatedUser._id)

        res.json({
            success: true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Please try again later'
        })
    }
}

const removeFavourite = async( req, res ) => {

    const { authenticatedUser } = req
    const { favourite } = req.body
    const el = authenticatedUser.favourites.indexOf(favourite)

    try {        
        if (el > -1) {
            
            authenticatedUser.favourites.splice(el, 1)

            await User.findByIdAndUpdate(authenticatedUser._id, authenticatedUser)

            const user = await User.findById(authenticatedUser._id)

            res.json({
                success: true,
                user
            })
        }

        else throw new Error
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Please try again later'
        })
    }

}

module.exports = {
    addFavourite,
    removeFavourite
}