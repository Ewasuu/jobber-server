const { Schema, model } = require('mongoose')

const usuarioSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please introduce a name']
    },
    email: {
        type: String,
        required: [true, 'Please introduce an email']
    },
    password: {
        type: String,
        required: [true, 'Please introduce a password']
    },
    img: {
        type: String,
        default: 'https://res.cloudinary.com/dcjr34ebn/image/upload/v1646658167/uknown_qet6kn.webp'
    },
    estate: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
    confirmated: {
        type: Boolean,
        default: false
    },
    favourites: {
        type: Array,
        default: []
    }
})

usuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject()
    user.uid = _id
	return user
}

module.exports = model( 'User', usuarioSchema )