const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createComment = {
  body: Joi.object().keys({
    message: Joi.string().required(),
    post: Joi.string().required().custom(objectId)
  })
}

const getComment = {
  params: Joi.object().keys({
    commentId: Joi.string().custom(objectId)
  })
}

const deleteComment = {
  params: Joi.object().keys({
    commentId: Joi.string().required().custom(objectId)
  })
}

const updateComment = {
  params: Joi.object().keys({
    commentId: Joi.string().required().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      message: Joi.string().max(100)
    })
    .min(1)
}

module.exports = {
  createComment,
  getComment,
  deleteComment,
  updateComment
}
