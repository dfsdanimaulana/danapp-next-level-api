const express = require('express')
const auth = require('../../middlewares/auth')
const config = require('../../config/config')
const multer = require('../../middlewares/multer')
const validate = require('../../middlewares/validate')
const cloudinaryUpload = require('../../middlewares/cloudinaryUpload')
const { userDataValidation } = require('../../validations')
const { userDataController } = require('../../controllers')

const router = express.Router()

router
  .route('/')
  .get(auth('getUsers'), userDataController.getUserDatas)
  .patch(auth(), validate(userDataValidation.updateUserData), userDataController.updateUserData)

router.route('/save-post').patch(auth(), validate(userDataValidation.updateSavedPost), userDataController.updateSavedPost)
router
  .route('/avatar')
  .patch(
    auth(),
    multer.upload('image', 'image/jpeg'),
    cloudinaryUpload.uploadPost('image', config.cloudinary.upload_pic),
    validate(userDataValidation.updateUserAvatar),
    userDataController.updateUserAvatar
  )

router
  .route('/:userId')
  .get(auth('getUsers'), validate(userDataValidation.getUserData), userDataController.getUserData)
  .post(auth('manageUsers'), validate(userDataValidation.createUserData), userDataController.createUserData)

module.exports = router
