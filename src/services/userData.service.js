const httpStatus = require('http-status')
const { UserData } = require('../models')
const ApiError = require('../utils/ApiError')

/**
 * @param {Object<User>} user object of User collection
 * @returns {Promise<UserData>}
 */
const createUserData = async (user) => {
  return UserData.create({ user: user.id })
}

/**
 *
 * @param {ObjectId} userId object of User collection
 * @returns {Promise<UserData>}
 */
const queryUserData = async (userId) => {
  return UserData.findOne({ user: userId })
}

/**
 *
 * @param {ObjectId} id Object id of UserData collection
 * @returns {Promise}
 */
const deleteUserData = async (id) => {
  return UserData.findByIdAndDelete(id)
}

/**
 *
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
module.exports = {
  createUserData,
  queryUserData,
  deleteUserData,
  deleteUserDataByUserId
}
