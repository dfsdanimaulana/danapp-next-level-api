const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins')

const replaySchema = mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    trim: true,
    required: true
  }
})

const commentSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Post',
      required: true
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      trim: true,
      required: true
    },
    like: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
      }
    ],
    replay: [replaySchema]
  },
  {
    timestamps: true
  }
)

// add plugin that converts mongoose to json
commentSchema.plugin(toJSON)
commentSchema.plugin(paginate)

replaySchema.plugin(toJSON)

/**
 * @typedef Comment
 */
const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
