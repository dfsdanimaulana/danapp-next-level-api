const express = require('express')
const config = require('../../config/config')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const postValidation = require('../../validations/post.validation')
const postController = require('../../controllers/post.controller')
const multer = require('../../middlewares/multer')
const cloudinaryUpload = require('../../middlewares/cloudinaryUpload')

const router = express.Router()

router
  .route('/')
  .get(auth(), postController.getPosts)
  .post(
    auth(),
    multer.uploads('image', 'image/jpeg'),
    cloudinaryUpload.uploadPost('image', config.cloudinary.upload_post),
    validate(postValidation.createPost),
    postController.createPost
  )

module.exports = router
