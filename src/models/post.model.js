const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('./plugins')

const imageSchema = mongoose.Schema({
  publicId: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isDataURI(value)) {
        throw new Error('invalid image url')
      }
    }
  }
})

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    uniqueId: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error('uniqueId must be alpha string only')
        }
      }
    },
    image: [imageSchema],
    caption: {
      type: String,
      maxlength: 100,
      default: ' '
    },
    hashtag: [
      {
        type: String
      }
    ],
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostComment'
      }
    ],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
postSchema.plugin(toJSON)
postSchema.plugin(paginate)

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema)

module.exports = Post
