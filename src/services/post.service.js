const { Post } = require('../models')

/**
 * Create new post
 * @param {Object} postBody
 * @returns {Promise<Post>}
 */
const createPost = (postBody) => {
  return Post.create(postBody)
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

module.exports = { queryPosts, createPost }
