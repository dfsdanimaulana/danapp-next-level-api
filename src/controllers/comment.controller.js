const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync')
const { commentService } = require('../services')

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req)
  res.status(httpStatus.CREATED).send(comment)
})

const getComments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user', 'post'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const results = await commentService.queryComments(filter, options)
  res.send(results)
})

const getComment = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId)
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found')
  }
  res.send(comment)
})

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req)
  res.status(httpStatus.NO_CONTENT).send()
})

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req)
  res.send(comment)
})
module.exports = {
  getComment,
  getComments,
  createComment,
  deleteComment,
  updateComment
}
