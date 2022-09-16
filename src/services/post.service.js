const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const { Post } = require('../models')
const userDataService = require('./userData.service')

/**
 * Create new post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
  const post = await Post.create(postBody)
  // save post id to user post data
  const update = await userDataService.updateUserDataPost(postBody.user, post.id)
  if (!update) {
    throw new ApiError(httpStatus.FAILED_DEPENDENCY, 'failed to update user data post')
  }

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
  const post = Post.findById(postId)
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }
  return post
}

/**
 * Delete post by id
 * @param {ObjectId} postId
 * @returns {Promise<Post>}
 */
const deletePostById = async (userId, postId) => {
  const post = await getPostById(postId)
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found')
  }
  const deleteUserDataPost = await userDataService.updateUserDataPost(userId, postId)
  if (!deleteUserDataPost) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete post id in user data')
  }
  await post.remove()

  return post
}

module.exports = {
  queryPosts,
  createPost,
  getPostById,
  deletePostById
}
