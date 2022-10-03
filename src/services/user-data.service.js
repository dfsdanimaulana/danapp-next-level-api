const httpStatus = require('http-status')
const { UserData } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * create user data
 * @param {Object<User>} user object of User collection
 * @returns {Promise<UserData>}
 */
const createUserData = async (userDataBody) => {
  return UserData.create(userDataBody)
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
const queryUserDatas = async (filter, options) => {
  const datas = await UserData.paginate(filter, options)
  return datas
}

/**
 *  get user data by user id
 * @param {ObjectId} userId object of User collection
 * @returns {Promise<UserData>}
 */
const getUserDataByUserId = async (userId) => {
  return UserData.findOne({ user: userId })
}

/**
 *  delete user data by userData id
 * @param {ObjectId} id Object id of UserData collection
 * @returns {Promise}
 */
const deleteUserData = async (id) => {
  return UserData.findByIdAndDelete(id)
}

/**
 * delete user data by user id
 * @param {ObjectId} userId Object id of User collection
 * @returns {Promise}
 */
const deleteUserDataByUserId = async (userId) => {
  const data = await UserData.findOne({ user: userId })
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User data not found')
  }
  await data.remove()
}

/**
 * Update user data by user id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserDataUserById = async (userId, updateBody) => {
  const data = await getUserDataByUserId(userId)
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User data not found')
  }

  Object.assign(data, updateBody)
  await data.save()
  return data
}

const updateUserDataPost = async (userId, postId) => {
  let updateOption = {
    $addToSet: {
      post: postId
    }
  }

  if (await UserData.isPostExists(userId, postId)) {
    updateOption = {
      $pull: {
        post: postId
      }
    }
  }

  const update = await UserData.findOneAndUpdate({ user: userId }, updateOption)
  if (!update) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User data not found')
  }

  return update
}

const updateUserSavedPost = async (userId, postId) => {
  let updateOption = {
    $addToSet: {
      savedPost: postId
    }
  }
  if (await UserData.isSavedPostExists(userId, postId)) {
    updateOption = {
      $pull: {
        savedPost: postId
      }
    }
  }
  const update = await UserData.findOneAndUpdate({ user: userId }, updateOption)
  if (!update) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User data not found')
  }

  return update
}

const updateUserAvatar = async (userId, image) => {
  const data = await UserData.findOneAndUpdate(
    { user: userId },
    {
      $set: {
        image: {
          avatar: image[0]
        }
      }
    }
  )
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to update user avatar')
  }
  return data
}

module.exports = {
  createUserData,
  queryUserDatas,
  getUserDataByUserId,
  deleteUserData,
  deleteUserDataByUserId,
  updateUserDataUserById,
  updateUserDataPost,
  updateUserSavedPost,
  updateUserAvatar
}
