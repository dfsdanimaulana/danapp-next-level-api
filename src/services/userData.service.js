const { UserData } = require('../models')

const createUserData = async (user) => {
  return UserData.create({ user: user.id })
}

module.exports = {
  createUserData
}
