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

postSchema.statics.isCommentExists = async function (postId, commentId) {
  const data = await this.findById(postId)
  if (!data) {
    throw new Error('Post no found')
  }
  return !!data.comment.includes(commentId)
}

/**
 * @typedef Post
 */
const Post = mongoose.model('Post', postSchema)

module.exports = Post
