const express = require('express')
const router = express.Router()

router.get('/tables', (req, res, next) => {
  res.json({
    state: true
  })
  return res.end()
})

module.exports = router
