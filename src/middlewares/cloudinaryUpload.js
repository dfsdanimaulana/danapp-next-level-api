const { uploadService } = require('../services')

const uploadPost = (param, uploadPreset) => async (req, res, next) => {
  if (!req.file && !req.files) {
    throw new Error('file required')
  }

  if (req.file) {
    const data = await uploadService.uploadImage(req.file, uploadPreset) // return object
    req.body[param] = [data]
    next()
  }

  if (req.files) {
    const datas = await uploadService.uploadImages(req.files, uploadPreset) // return array of object
    req.body[param] = datas
    next()
  }
}

module.exports = { uploadPost }
