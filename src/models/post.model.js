const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const imageSchema = mongoose.Schema({
  public_id: {
    type: String,
    required: true
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
    ]
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
 * check if comment id exist in post comment array or not
 * @param {ObjectId} postId
 * @param {ObjectId} commentId
 * @returns {Boolean}
 */
postSchema.statics.isCommentExists = async function (postId, commentId) {
  const data = await this.findById(postId)
  if (!data) {
    throw new Error('Post no found')
  }
  return !!data.comment.includes(commentId)
}

/**
 * check if user like the post or not
 * @param {ObjectId} postId
 * @param {ObjectId} userId
 * @returns {Boolean}
 */
postSchema.statics.isUserLiked = async function (postId, userId) {
  const data = await this.findById(postId)
  if (!data) {
    throw new Error('Post no found')
  }
  return !!data.like.includes(userId)
}

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema)

module.exports = Post
