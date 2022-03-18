const User = require('../models/user')

const addFavourite = async( req, res ) => {
    
    const { authenticatedUser } = req
    const { favourite } = req.body

    try {
        authenticatedUser.favourites.push(favourite)
        console.log(authenticatedUser.favourites)
        await User.findByIdAndUpdate(authenticatedUser._id, authenticatedUser)

        const user = await User.findById(authenticatedUser._id)

        res.json({
            success: true,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            msg: 'Please try again later'
        })
    }
}

const removeFavourite = async( req, res ) => {

    const { authenticatedUser } = req
    const { favourite } = req.body

    const a = authenticatedUser.favourites.find( el => { return el.id === favourite.id })

    const el = authenticatedUser.favourites.indexOf(a)


    try {        
        if (el > -1) {
            
            console.log(el)
            authenticatedUser.favourites.splice(el, 1)
            console.log(authenticatedUser.favourites)
            console.log(el > -1)


            await User.findByIdAndUpdate(authenticatedUser._id, authenticatedUser)

            const user = await User.findById(authenticatedUser._id)

            return res.json({
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