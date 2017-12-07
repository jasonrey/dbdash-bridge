const path = require('path')

require('dotenv').config({
  path: process.env.BRIDGECONFIG ? path.resolve(process.cwd(), process.env.BRIDGECONFIG) : path.resolve(__dirname, '../.env')
})

if (!process.env.PROJECTKEY) {
  throw new Error('PROJECTKEY not defined.')
}

module.exports = (async () => {
  if (process.env.TUNNEL_HOST) {
    await require('./tunnel')()

    console.log(`Tunnel established at port: ${process.env.TUNNEL_LOCAL_PORT}`)
  }

  const app = require('./app')
  const http = require('http')
  const port = process.env.APP_PORT || 3000

  const server = http.createServer(app)

  server.listen(port, () => {
    console.info(`Bridge started on port ${port}`)
  })

  return server
})()
