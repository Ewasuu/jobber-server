const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignIn } = require('../controllers/login')
const { validateFields } = require('../middlewares/validateFields')

const router = Router()

router.post('/', [
    check('email', 'An email is required').isEmail(),
    check('password', 'A password is required').not().isEmpty() ,
    validateFields
], login)

router.post('/google', [
	check('id_token', 'ID token en necesario').not().isEmpty(),
	validateFields
	], googleSignIn)

module.exports = router