const glob = require('glob')
const path = require('path')
const router = require('express').Router()
const cors = require('cors')
const authorizeAccess = require('../middlewares/authorizeAccess')
const bodyParser = require('body-parser')

router.use(cors())
router.use(authorizeAccess)
router.use(bodyParser.json())

glob.sync(path.resolve(__dirname, './*'))
  .filter(file => path.basename(file) !== 'index.js')
  .map(file => router.use('/', require(file)))

router.use((err, req, res, next) => {
  res.status(err.status || 400)
  res.json({
    message: err.message
  })

  return res.end()
})

module.exports = router
