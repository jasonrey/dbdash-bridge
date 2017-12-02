const express = require('express')
const router = express.Router()
const db = require('../entities/db')

router.get('/tables', async (req, res, next) => {
  const [result, fields] = await db.raw('show tables')

  res.json(result.map(item => item[fields[0].name]))
  res.end()
})

router.get('/table/:table/columns', async (req, res, next) => {
  try {
    const [result] = await db.raw('show columns from ??', [req.params.table])

    const fields = result.map(field => {
      return {
        name: field.Field,
        type: field.Type.split('(')[0],
        length: field.Type.match(/\((.*)\)/g) ? /\((.*)\)/g.exec(field.Type)[1] : null,
        primary: field.Key === 'PRI',
        allowNull: field.Null === 'YES',
        increments: field.Extra.includes('auto_increment'),
        default: field.Default
      }
    })

    res.json(fields)
    return res.end()
  } catch (err) {
    return next(err)
  }
})

router.get('/table/:table/records', async (req, res, next) => {
  const payload = JSON.parse(req.query.payload) || {}

  const query = db(req.params.table)

  if (payload.limit) {
    query.limit(payload.limit)
  }

  if (payload.offset) {
    query.offset(payload.offset)
  }

  const result = await query

  res.json(result)
  return res.end()
})

router.get('/table/:table/records/count', async (req, res, next) => {
  // const payload = JSON.parse(req.query.payload) || {}

  const query = db(req.params.table)

  query.count('* as total').first()

  const result = await query

  res.json(result)
  return res.end()
})

module.exports = router
