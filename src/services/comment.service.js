const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { Comment } = require('../models')
const postService = require('./post.service')

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
  await postService.updatePostComment(req.body.post, comment.id)
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
  await postService.updatePostComment(comment.post, req.params.commentId)

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
