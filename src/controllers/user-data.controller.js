const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { userDataService } = require('../services')

const getUserData = catchAsync(async (req, res) => {
  const result = await userDataService.getUserDataByUserId(req.params.userId)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User data not found')
  }
  res.send(result)
})

const createUserData = catchAsync(async (req, res) => {
  const userData = await userDataService.createUserData(req.body)
  res.status(httpStatus.CREATED).send(userData)
})

const updateUserData = catchAsync(async (req, res) => {
  const userData = await userDataService.updateUserDataUserById(req.params.userId, req.body)
  res.send(userData)
})

const updateSavedPost = catchAsync(async (req, res) => {
  const userData = await userDataService.updateUserSavedPost(req.user.id, req.body.postId)
  res.send(userData)
})

module.exports = {
  getUserData,
  createUserData,
  updateUserData,
  updateSavedPost
}
