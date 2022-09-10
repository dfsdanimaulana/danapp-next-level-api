const multer = require('multer')
const httpStatus = require('http-status')
const cloudinary = require('../config/cloudinary')
const config = require('../config/config')
const ApiError = require('../utils/ApiError')
const { dataUri } = require('../utils/dataUri')

const uploadImage = async (err, req, res, next) => {
  const error = err
  if (error) {
    if (error instanceof multer.MulterError) {
      return next(new ApiError(httpStatus.BAD_REQUEST, 'A Multer error occurred when uploading.'))
    }
    return next(new ApiError(httpStatus.BAD_REQUEST, 'An unknown error occurred when uploading.'))
  }

  // upload single image
  if (req.file) {
    const file = dataUri(req).content()

    const upload = await cloudinary.uploader.upload(file, {
      upload_preset: config.cloudinary.upload_post
    })

    req.body.image = [
      {
        publicId: upload.public_id,
        url: upload.secure_url
      }
    ]

    return next()
  }

  return next(new ApiError(httpStatus.NOT_FOUND, 'file required'))
}

module.exports = {
  uploadImage
}
