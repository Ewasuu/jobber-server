const { Router } = require('express')
const { check } = require('express-validator')

const { login, googleSignIn, keepSession } = require('../controllers/login')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validatejwt')

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

router.post('/keep', [
	validateJWT,
	validateFields
	], keepSession)

module.exports = router