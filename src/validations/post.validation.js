const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createPost = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    uniqueId: Joi.string().required(),
    image: Joi.array().required(),
    caption: Joi.string(),
    hashtag: Joi.array(),
    comment: Joi.array(),
    like: Joi.array()
  })
}

module.exports = {
  createPost
}
