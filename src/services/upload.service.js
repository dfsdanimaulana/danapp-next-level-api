const cloudinary = require('../config/cloudinary')
const formatData = require('../utils/formatData')

/**
 * Upload image to cloudinary
 * @param {string || FileBuffer} file
 * @param {string} uploadPreset cloudinary upload preset
 * @returns {Promise}
 */
const uploadImage = async (file, uploadPreset) => {
  return new Promise((resolve) => {
    let data
    if (typeof file === 'string') {
      data = file
    } else {
      data = formatData.bufferToDataUri(file)
    }
    cloudinary.uploader
      .upload(data, {
        upload_preset: uploadPreset
      })
      .then((res) => {
        resolve({
          public_id: res.public_id,
          secure_url: res.secure_url
        })
      })
  })
}

const uploadImages = async (files, uploadPreset) => {
  return Promise.all(files.map((file) => uploadImage(file, uploadPreset)))
}

/**
 * Delete image in cloudinary
 * @param {Object} image object contain public_id and secure_url of cloudinary image
 * @returns {Promise}
 */
const destroyImage = async (image) => {
  return cloudinary.uploader.destroy(image.public_id)
}

const destroyImages = async (images) => {
  return Promise.all(images.map((image) => destroyImage(image)))
}

module.exports = {
  uploadImage,
  uploadImages,
  destroyImage,
  destroyImages
}
