// const httpStatus = require('http-status')
const { Post } = require('../models')
// const ApiError = require('../utils/ApiError')

/**
 * Create new post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = async (postBody) => {
  return Post.create(postBody)
}

module.exports = { createPost }
