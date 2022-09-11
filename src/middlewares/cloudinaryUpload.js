const uploader = require('../services/upload.service')

const uploadPost = (param, uploadPreset) => async (req, res, next) => {
  if (!req.file && !req.files) {
    throw new Error('file required')
  }

  if (req.file) {
    const upload = await uploader.uploadImage(req.file, uploadPreset)
    req.body[param] = [upload]
    next()
  }

  if (req.files) {
    await uploader.uploadImages(req.body, param)(req.files, uploadPreset)
    next()
  }
}

module.exports = { uploadPost }
