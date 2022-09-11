const httpStatus = require('http-status')
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync')
const { postService } = require('../services')

const getPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user'])
  const options = pick(req.query, ['sortBy', 'limit', 'page'])
  const results = await postService.queryPosts(filter, options)
  res.send(results)
})

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.body)
  res.status(httpStatus.CREATED).send(post)
})

module.exports = {
  getPosts,
  createPost
}
