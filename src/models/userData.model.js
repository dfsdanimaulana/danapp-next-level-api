const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const imageSchema = mongoose.Schema({
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/dfsdanimaulana/image/upload/v1661665020/thumbnails/male_avatar_kzr9sl.png'
  },
  cover: {
    type: String,
    default: 'https://res.cloudinary.com/dfsdanimaulana/image/upload/v1663135182/thumbnails/IMG_6156_nsu9ti.jpg'
  }
})

const socialSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  url: {
    type: String,
    trim: true,
    required: true
  }
})

const addressSchema = mongoose.Schema({
  street: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true
  }
})

const userDataSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    displayName: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    image: imageSchema,
    gender: {
      type: String,
      enum: ['male', 'female']
    },
    birthday: {
      type: Date // ref: https://stackoverflow.com/questions/40981982/javascript-create-date-from-year-month-day
    },
    address: addressSchema,
    contact: [
      {
        type: Number
      }
    ],
    social: [socialSchema],
    post: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
      }
    ],
    savedPost: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Post'
      }
    ],
    followers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      }
    ],
    following: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      }
    ]
  },

  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
userDataSchema.plugin(toJSON)
userDataSchema.plugin(paginate)

imageSchema.plugin(toJSON)
socialSchema.plugin(toJSON)
addressSchema.plugin(toJSON)

/**
 * @typedef UserData
 */
const UserData = mongoose.model('UserData', userDataSchema)

module.exports = UserData
