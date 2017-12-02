const path = require('path')

require('dotenv').config({
  path: process.env.BRIDGECONFIG
    ? path.resolve(process.cwd(), process.env.BRIDGECONFIG)
    : path.resolve(__dirname, '../.env')
})

module.exports = {
  client: process.env.DB_CLIENT || 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE
  }
}
