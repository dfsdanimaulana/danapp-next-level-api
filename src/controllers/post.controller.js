const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync')
const { postService } = require('../services')

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req)
  res.status(httpStatus.CREATED).send(post)
})

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const results = await postService.queryPosts(filter, options)
  res.send(results)
})

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId)
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }
  res.send(post)
})

const deletePost = catchAsync(async (req, res) => {
  await postService.deletePostById(req)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  getPost,
  getPosts,
  createPost,
  deletePost
}
