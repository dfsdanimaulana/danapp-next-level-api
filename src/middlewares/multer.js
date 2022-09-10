const multer = require('multer')

const storage = multer.memoryStorage()

// upload single image
const upload = multer({ storage }).single('image')

// upload multiple images
const uploads = multer({ storage }).array('images', 10)

module.exports = { upload, uploads }
