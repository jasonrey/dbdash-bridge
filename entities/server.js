const path = require('path')

require('dotenv').config({
  path: process.env.BRIDGECONFIG ? path.resolve(process.cwd(), process.env.BRIDGECONFIG) : path.resolve(__dirname, '../.env')
})

if (!process.env.PROJECTKEY) {
  throw new Error('PROJECTKEY not defined.')
}

const app = require('./app')
const http = require('http')
const port = process.env.APP_PORT || 3000

const server = http.createServer(app)

server.listen(port, () => {
  console.info(`Bridge started on port ${port}`)
})

module.exports = server
