const DatauriParser = require('datauri/parser')

const parser = new DatauriParser()

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from string buffer
 */
const dataUri = (req) => {
  parser.format('.png', req.file.buffer)
}

module.exports = { dataUri }
