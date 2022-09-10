const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const postValidation = require('../../validations/post.validation')
const postController = require('../../controllers/post.controller')
const multer = require('../../middlewares/multer')
const cloudinaryUpload = require('../../middlewares/cloudinaryUpload')

const router = express.Router()

router
  .route('/')
  .get(postController.getPosts)
  .post(auth(), multer.upload, cloudinaryUpload.uploadImage, validate(postValidation.createPost), postController.createPost)

module.exports = router
