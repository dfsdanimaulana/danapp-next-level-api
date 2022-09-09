const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const postValidation = require('../../validations/post.validation')
const postController = require('../../controllers/post.controller')

const router = express.Router()

router.route('/').get(postController.getPosts).post(auth(), validate(postValidation.createPost), postController.createPost)

module.exports = router
