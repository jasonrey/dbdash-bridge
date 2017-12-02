const express = require('express')
const app = express()

app.disable('x-powered-by')
app.use(require('compression')())
app.set('trust proxy', true)
app.set('env', process.env.NODE_ENV)

app.use('/', require('./bridge'))

module.exports = app
