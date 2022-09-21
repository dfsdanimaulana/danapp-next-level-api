const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createPost = {
  body: Joi.object().keys({
    image: Joi.array()
      .items(
        Joi.object().keys({
          public_id: Joi.string().required(),
          secure_url: Joi.string().uri().required()
        })
      )
      .required(),
    caption: Joi.string().max(100),
    hashtag: Joi.array().items(Joi.string()),
    comment: Joi.array().items(Joi.string().required().custom(objectId)),
    like: Joi.array().items(Joi.string().required().custom(objectId))
  })
}

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId)
  })
}

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId)
  })
}

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      caption: Joi.string().max(100),
      hashtag: Joi.string()
    })
    .min(1)
}
module.exports = {
  createPost,
  getPost,
  deletePost,
  updatePost
}
