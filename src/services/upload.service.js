const cloudinary = require('../config/cloudinary')
const bufferToDataUri = require('../utils/bufferToDataUri')

const uploadImage = (file, uploadPreset) => {
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload(bufferToDataUri(file), {
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

const uploadImages = (files, uploadPreset) => {
  return Promise.all(files.map((file) => uploadImage(file, uploadPreset)))
}

const destroyImage = (images) => {
  return Promise.all(images.map((image) => cloudinary.uploader.destroy(image.public_id)))
}

module.exports = {
  uploadImage,
  uploadImages,
  destroyImage
}
