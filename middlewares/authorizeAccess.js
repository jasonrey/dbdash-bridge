const path = require('path')

require('dotenv').config({
  path: process.env.BRIDGECONFIG ? path.resolve(process.cwd(), process.env.BRIDGECONFIG) : path.resolve(__dirname, '../.env')
})

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new Error('Unauthorized.'))
  }

  const [authType, authToken] = req.headers.authorization.split(' ')

  if (authType !== 'Bearer' || authToken !== process.env.PROJECTKEY) {
    return next(new Error('Unauthorized.'))
  }

  next()
}
