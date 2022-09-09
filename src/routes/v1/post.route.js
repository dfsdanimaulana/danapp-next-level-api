const express = require('express')
const postController = require('../../controllers/post.controller')

const router = express.Router()

router.route('/').get(postController.getPosts)

module.exports = router
