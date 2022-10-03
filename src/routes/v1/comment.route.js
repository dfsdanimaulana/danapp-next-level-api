const express = require('express')
const auth = require('../../middlewares/auth')
const validate = require('../../middlewares/validate')
const { commentValidation } = require('../../validations')
const { commentController } = require('../../controllers')

const router = express.Router()

router
  .route('/')
  .get(auth(), commentController.getComments)
  .post(auth(), validate(commentValidation.createComment), commentController.createComment)

router
  .route('/:commentId')
  .get(auth(), validate(commentValidation.getComment), commentController.getComment)
  .delete(auth(), validate(commentValidation.deleteComment), commentController.deleteComment)
  .patch(auth(), validate(commentValidation.updateComment), commentController.updateComment)

module.exports = router
