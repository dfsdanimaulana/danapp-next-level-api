const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const { userDataValidation } = require('../../validations')
const { userDataController } = require('../../controllers')

const router = express.Router()

router.route('/:userId').get(auth('getUsers'), validate(userDataValidation.getUserData), userDataController.getUserData)

module.exports = router
