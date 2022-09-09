const httpStatus = require('http-status')
// const pick = require('../utils/pick')
// const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { postService } = require('../services')

const getPosts = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: 'post route' })
})

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.body)
  res.status(httpStatus.CREATED).send(post)
})

module.exports = {
  getPosts,
  createPost
}
