const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')

const getPosts = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send({ message: 'post route' })
})

module.exports = {
  getPosts
}
