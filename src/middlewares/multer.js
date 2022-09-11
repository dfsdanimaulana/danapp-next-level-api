const multer = require('multer')

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
        return cb(new Error(`Invalid upload: fieldname should be ${param} and ${mimetype} format`))
      }
    }
  }).single(param)

const uploads = (param, mimetype, max) =>
  multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (allowedMimetype.includes(file.mimetype) && file.fieldname === param) {
        cb(null, true)
      } else {
        cb(null, false)
        return cb(new Error(`Invalid upload: fieldname should be ${param} and ${mimetype} format`))
      }
    }
  }).array(param, max)

module.exports = { upload, uploads }
