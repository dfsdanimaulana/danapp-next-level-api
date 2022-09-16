const Joi = require('joi')
const { objectId } = require('./custom.validation')

const createUserData = {
  body: Joi.object().keys({
    user: Joi.string().required().custom(objectId),
    displayName: Joi.string().max(20),
    description: Joi.string().max(100),
    image: Joi.object().keys({
      avatar: Joi.string().uri(),
      cover: Joi.string().uri()
    }),
    gender: Joi.string().valid('male', 'female'),
    birthday: Joi.date(),
    address: Joi.object().keys({
      street: Joi.string(),
      city: Joi.string(),
      country: Joi.string()
    }),
    contact: Joi.array().items(Joi.number()),
    social: Joi.array().items(
      Joi.object().keys({
        name: Joi.string(),
        url: Joi.string().uri()
      })
    )
  })
}

const getUserData = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  })
}

const updateUserData = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId)
  }),
  body: Joi.object()
    .keys({
      displayName: Joi.string().max(20),
      description: Joi.string().max(100),
      image: Joi.object().keys({
        avatar: Joi.string().uri(),
        cover: Joi.string().uri()
      }),
      gender: Joi.string().valid('male', 'female'),
      birthday: Joi.date(),
      address: Joi.object().keys({
        street: Joi.string(),
        city: Joi.string(),
        country: Joi.string()
      }),
      contact: Joi.array().items(Joi.number()),
      social: Joi.array().items(
        Joi.object().keys({
          name: Joi.string(),
          url: Joi.string().uri()
        })
      )
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
