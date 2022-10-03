const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { Post } = require('../models')
const userDataService = require('./user-data.service')
const uploadService = require('./upload.service')

/**
 * Create new post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (req) => {
  const { ...postBody } = req.body
  postBody.user = req.user.id
  const post = await Post.create(postBody)
  // save post id to user post data
  await userDataService.updateUserDataPost(req.user.id, post.id)
  return post
}

/**
 * Query for posts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPosts = async (filter, options) => {
  const posts = await Post.paginate(filter, options)
  return posts
}

/**
 * get post by post id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const getPostById = async (postId) => {
  return Post.findById(postId)
}

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (req) => {
  const post = await getPostById(req.params.postId)
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }
  if (post.user.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Not allowed')
  }
  // delete post id from user post data
  await userDataService.updateUserDataPost(post.user, req.params.postId)

  // delete image in cloudinary
  await Promise.all(post.image.map((image) => uploadService.destroyImage(image)))
  await post.remove()
  return post
}

/**
 * update post by id
 * @param {Object} req
 * @returns {Promise<Post>}
 */
const updatePostById = async (req) => {
  const post = await getPostById(req.params.postId)
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }
  if (post.user.toString() !== req.user.id) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Not allowed')
  }
  Object.assign(post, req.body)
  await post.save()
  return post
}

module.exports = {
  queryPosts,
  createPost,
  getPostById,
  deletePostById,
  updatePostById
}
