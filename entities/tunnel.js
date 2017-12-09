const fs = require('fs')
const tunnel = require('open-ssh-tunnel')
const getPort = require('get-port')

module.exports = async () => {
  if (!process.env.TUNNEL_LOCAL_PORT) {
    process.env.TUNNEL_LOCAL_PORT = await getPort()
  }

  const options = {
    username: process.env.TUNNEL_USERNAME,
    host: process.env.TUNNEL_HOST,
    port: process.env.TUNNEL_PORT || 22,
    srcAddr: process.env.TUNNEL_SRC_HOST,
    srcPort: process.env.TUNNEL_SRC_PORT,
    dstAddr: process.env.TUNNEL_DEST_HOST,
    dstPort: process.env.TUNNEL_DEST_PORT,
    localAddr: process.env.TUNNEL_LOCAL_HOST,
    localPort: process.env.TUNNEL_LOCAL_PORT,
    readyTimeout: process.env.TUNNEL_READY_TIMEOUT || 3000,
    forwardTimeout: process.env.TUNNEL_FORWARD_TIMEOUT || 3000,
    keepaliveInterval: process.env.TUNNEL_KEEPALIVE || 30000
  }

  if (!process.env.TUNNEL_PASSWORD && !process.env.TUNNEL_PRIVATE_KEY) {
    process.env.TUNNEL_PRIVATE_KEY = `${process.env.HOME}/.ssh/id_rsa`
  }

  if (process.env.TUNNEL_PRIVATE_KEY) {
    options.privateKey = fs.readFileSync(process.env.TUNNEL_PRIVATE_KEY)
  } else {
    options.password = process.env.TUNNEL_PASSWORD
  }

  return tunnel(options)
}
