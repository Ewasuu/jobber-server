const { Router } = require('express')
const { check } = require('express-validator')


const { addFavourite, removeFavourite } = require('../controllers/favourite')
const { validateFields } = require('../middlewares/validateFields')
const { validateJWT } = require('../middlewares/validatejwt')

const router = Router()

router.put('/add', [
    validateJWT,
    check('favourite', 'data to add is needed').not().isEmpty(),
    validateFields
], addFavourite)

router.delete('/remove', [
    validateJWT,
    check('favourite', 'data to add is needed').not().isEmpty(),
    validateFields
], removeFavourite)

module.exports = router