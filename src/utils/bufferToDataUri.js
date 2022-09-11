/**
 * Convert file buffer to data uri
 * @param {File} file File object of uploaded image via form
 * @returns {String} string of data uri
 */
const bufferToDataUri = (file) => {
  const { mimetype } = file
  const encoding = 'base64'
  const data = file.buffer.toString(encoding)

  const dataUri = `data:${mimetype};${encoding},${data}`

  return dataUri
}

module.exports = bufferToDataUri
