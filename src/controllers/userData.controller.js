const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { userDataService } = require('../services')

const getUserData = catchAsync(async (req, res) => {
  const result = await userDataService.queryUserData(req.params.userId)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User data not found')
  }
  res.send(result)
})

module.exports = {
  getUserData
}
