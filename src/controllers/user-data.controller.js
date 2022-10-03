const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const pick = require('../utils/pick')
const catchAsync = require('../utils/catchAsync')
const { userDataService } = require('../services')

const getUserDatas = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user'])
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate'])
  const results = await userDataService.queryUserDatas(filter, options)
  res.send(results)
})

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
  await userDataService.updateUserDataUserById(req.user.id, req.body)
  res.status(httpStatus.NO_CONTENT).send()
})

const updateSavedPost = catchAsync(async (req, res) => {
  await userDataService.updateUserSavedPost(req.user.id, req.body.postId)
  res.status(httpStatus.NO_CONTENT).send()
})

const updateUserAvatar = catchAsync(async (req, res) => {
  await userDataService.updateUserAvatar(req.user.id, req.body.image)
  res.status(httpStatus.NO_CONTENT).send()
})

module.exports = {
  getUserData,
  getUserDatas,
  createUserData,
  updateUserData,
  updateSavedPost,
  updateUserAvatar
}
