const mongoose = require('mongoose')
const validator = require('validator')
const { toJSON, paginate } = require('./plugins')

const imageSchema = mongoose.Schema({
  public_id: {
    type: String,
    required: true,
    private: true
  },
  secure_url: {
    type: String,
    required: true
  }
})

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    image: [imageSchema],
    caption: {
      type: String,
      maxlength: 100
    },
    hashtag: [
      {
        type: String,
        trim: true
      }
    ],
    comment: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Comment'
      }
    ],
    like: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      }
    ],
    uniqueString: {
      type: String,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error('uniqueString must be alpha string only')
        }
      }
    }
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
postSchema.plugin(toJSON)
postSchema.plugin(paginate)

imageSchema.plugin(toJSON)

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema)

module.exports = Post
