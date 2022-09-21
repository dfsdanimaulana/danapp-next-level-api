const multer = require('multer')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')

const storage = multer.memoryStorage()

const allowedMimetype = ['image/png', 'image/jpeg']

const upload = (param, mimetype) =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (allowedMimetype.includes(file.mimetype) && file.fieldname === param) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new ApiError(httpStatus.FORBIDDEN, `Invalid upload: fieldname should be ${param} and ${mimetype} format`))
      }
    }
  }).single(param)

const uploads = (param, mimetype, max = 10) =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (allowedMimetype.includes(file.mimetype) && file.fieldname === param) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new ApiError(httpStatus.FORBIDDEN, `Invalid upload: fieldname should be ${param} and ${mimetype} format`))
      }
    }
  }).array(param, max)

module.exports = { upload, uploads }
