const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { Comment, Post } = require('../models')

/**
 *
 * @param {String} postId
 * @param {String} commentId
 * @returns {Promise}
 */
const updatePostComment = async (postId, commentId) => {
  let updateOption = {
    $addToSet: {
      comment: commentId
    }
  }

  if (await Post.isCommentExists(postId, commentId)) {
    updateOption = {
      $pull: {
        comment: commentId
      }
    }
  }

  const update = await Post.findByIdAndUpdate(postId, updateOption)
  if (!update) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }

  return update
}

/**
 * Create new post
 * @param {Object} req
 * @returns {Promise<Comment>}
 */
const createComment = async (req) => {
  const { ...commentBody } = req.body
  commentBody.user = req.user.id
  const comment = new Comment(commentBody)
  // save comment id to post comment data
  await updatePostComment(req.body.post, comment.id)
  await comment.save()
  return comment
}

/**
 * Query for comments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryComments = async (filter, options) => {
  const comments = await Comment.paginate(filter, options)
  return comments
}

/**
 * get comment by comment id
 * @param {ObjectId} commentId
 * @returns {Promise<Comment>}
 */
const getCommentById = async (commentId) => {
  return Comment.findById(commentId)
}

/**
 * Delete comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<Comment>}
 */
const deleteCommentById = async (req) => {
  const comment = await getCommentById(req.params.commentId)
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
  }
  if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Not allowed')
  }
  // delete comment id from post comment data
  await updatePostComment(comment.post, req.params.commentId)

  await comment.remove()
  return comment
}

/**
 * update comment by id
 * @param {Object} req
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (req) => {
  const comment = await getCommentById(req.params.commentId)
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
  }
  if (comment.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Not allowed')
  }
  Object.assign(comment, req.body)
  await comment.save()
  return comment
}

const deleteCommentByPostId = async (post) => {
  return Comment.deleteMany({ post })
}

module.exports = {
  queryComments,
  createComment,
  getCommentById,
  deleteCommentById,
  updateCommentById,
  deleteCommentByPostId
}
