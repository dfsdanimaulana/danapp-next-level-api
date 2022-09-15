const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createUserData = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId)
  })
}

const getUserData = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
}

const updateUserData = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      displayName: Joi.string(),
      description: Joi.string(),
      image: Joi.object(),
      gender: Joi.string(),
      birthday: Joi.date(),
      address: Joi.object(),
      contact: Joi.array(),
      social: Joi.array()
    })
    .min(1)
}

const deleteUserData = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
}

module.exports = {
  createUserData,
  getUserData,
  updateUserData,
  deleteUserData
}
