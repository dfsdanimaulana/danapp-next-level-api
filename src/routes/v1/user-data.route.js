const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const { userDataValidation } = require('../../validations')
const { userDataController } = require('../../controllers')
const { userDataService } = require('../../services')

const router = express.Router()

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userDataValidation.getUserData), userDataController.getUserData)
  .post(auth('manageUsers'), validate(userDataService.createUserData, userDataController.createUserData))
  .patch(auth('manageUsers'), validate(userDataValidation.updateUserData, userDataController.updateUserData))

module.exports = router
