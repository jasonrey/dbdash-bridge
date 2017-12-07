const knex = require('knex')

let db

module.exports = (...params) => {
  if (!db) {
    db = knex({
      client: process.env.DB_CLIENT || 'mysql',
      connection: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT || process.env.TUNNEL_LOCAL_PORT || 3306,
        charset: process.env.DB_CHARSET || 'utf8mb4'
      }
    })
  }

  if (params.length) {
    return db(...params)
  }

  return db
}
