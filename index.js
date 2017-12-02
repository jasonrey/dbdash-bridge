module.exports = {
  get bridge () {
    return require('./entities/bridge')
  },

  get app () {
    return require('./entities/app')
  },

  get db () {
    return require('./entities/db')
  }
}
