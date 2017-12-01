require('dotenv').config()

module.exports = {
  client: process.env.DB_CLIENT || 'mysql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.NODE_ENV === 'test' ? (process.env.DB_TESTDATABASE || 'dbdashtest') : (process.env.DB_DATABASE || 'dbdash')
  },
  migrations: {
    tableName: process.env.DB_MIGRATIONTABLE || '.migrations'
  },
  seeds: {
    directory: './seeds/dev'
  }
}
