const cloudinary = require('../config/cloudinary')
const bufferToDataUri = require('../utils/bufferToDataUri')

/**
 * Upload a single image
 * @param {Buffer} file object buffer of image
 * @param {String} uploadPreset cloudinary upload preset to specify the folder to store the image
 * @returns {Object} object contain publicId and secure_url of image uploaded
 */
const uploadImage = async (file, uploadPreset) => {
  return new Promise((resolve) => {
    const image = bufferToDataUri(file)

    cloudinary.uploader.upload(
      image,
      {
        upload_preset: uploadPreset
      },
      (err, res) => {
        if (err) {
          throw new Error(err.message)
        }
        resolve({
          public_id: res.public_id,
          secure_url: res.secure_url
        })
      }
    )
  })
}

/**
 * Upload a multiple image
 * @param {Object} storage object to temporary store the upload response
 * @param {String} param key of object for upload response
 * @param {Array} files array containing File of uploaded image via form
 * @param {String} uploadPreset cloudinary upload preset to specify the folder to store the image
 * @returns {Array} array of object contain publicId and secure_url of uploaded image
 */
const uploadImages = (storage, param) => async (files, uploadPreset) => {
  for (const file of files) {
    const upload = await uploadImage(file, uploadPreset)
    if (!storage[param]) {
      storage[param] = [upload]
    } else {
      storage[param].push(upload)
    }
  }
}

module.exports = {
  uploadImage,
  uploadImages
}
