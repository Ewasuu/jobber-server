const  { Router } = require('express')
const { check } = require('express-validator')

const { 
    createUser,
    updateUser,
    confirmAccount,
    sendConfirmationEmailAgain } = require('../controllers/users')
const { idExistsValidator } = require('../helpers/dbvalidators')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validatejwt')

const router = Router()

router.post('/new', [
    check('name', 'the field name is required').not().isEmpty(),
    check('email', 'the field email is required').isEmail(),
    check('password', 'the field password is required').not().isEmpty(),
    validateFields
], createUser)

router.put('/:id/confirmaccount', [
    validateJWT,
    validateFields
    ],confirmAccount)

router.put('/:id', [
    validateJWT,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom( idExistsValidator ),
    validateFields
], updateUser)

router.get('/email', [
    check('email', 'An email is required'),
    validateFields
    ] ,sendConfirmationEmailAgain)

module.exports = router 