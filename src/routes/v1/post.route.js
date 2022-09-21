const express = require('express')
const config = require('../../config/config')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const { postValidation } = require('../../validations')
const { postController } = require('../../controllers')
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

router
  .route('/:postId')
  .get(auth(), validate(postValidation.getPost), postController.getPost)
  .delete(auth(), validate(postValidation.deletePost), postController.deletePost)
  .patch(auth(), validate(postValidation.updatePost), postController.updatePost)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Posts management and retrieval
 */

/**
 * @swagger
 * /posts:
 *    post:
 *      summary: Create new post
 *      description: Only authenticated user can create post.
 *      tags: [Posts]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - user
 *                - image
 *                - caption
 *                - hashtag
 *                - uniqueId
 *              properties:
 *                user:
 *                  type: string
 *                  description: string of mongodb ObjectId
 *                image:
 *                  type: file
 *                  description: file must be png or jpeg
 *                caption:
 *                  type: string
 *                  maxLength: 100
 *                  description: post caption
 *                hashtag:
 *                  type: array
 *                  description: array of string
 *                uniqueId:
 *                  type: string
 *                  description: must unique and alphabets only
 *              example:
 *                user: dsafaewrr543rwer
 *                image: [file.png]
 *                caption: new post
 *                uniqueId: dfdssfgegrtfdgdsfg
 *      responses:
 *           "201":
 *             description: Created
 *             content:
 *               application/json:
 *                 schema:
 *                    $ref: '#/components/schemas/Post'
 *           "403":
 *             $ref: '#/components/responses/Forbidden'
 *
 *
 */
