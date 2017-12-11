const express = require('express')
const router = express.Router()
const db = require('../entities/db')
const buildRules = require('../helpers/rules')
const buildFilters = require('../helpers/filters')

router.get('/tables', async (req, res, next) => {
  const [result, fields] = await db().raw('show tables')

  res.json(result.map(item => item[fields[0].name]))
  res.end()
})

router.get('/table/:table/columns', async (req, res, next) => {
  try {
    const [result] = await db().raw('show columns from ??', [req.params.table])

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

router.post('/table/:table/records/:mode?', async (req, res, next) => {
  const rules = JSON.parse(req.body.rules)

  const query = db(req.params.table)

  if (req.body.limit) {
    query.limit(req.body.limit)
  }

  if (req.body.offset) {
    query.offset(req.body.offset)
  }

  if (rules && rules.length) {
    buildRules(query, [{
      type: 'conditions',
      rules
    }])
  }

  if (req.body.filters && req.body.filters.length) {
    buildFilters(query, req.body.filters)
  }

  if (req.params.mode === 'sql') {
    res.json(query.toSQL())
    return res.end()
  }

  const result = await query

  res.json(result)
  return res.end()
})

router.post('/table/:table/aggregate/:mode?', async (req, res, next) => {
  const rules = JSON.parse(req.body.rules)
  const aggregate = req.body.aggregate || 'count'
  const column = req.body.column || '*'

  const query = db(req.params.table)

  query[aggregate](`${column} as total`)

  query.first()

  buildRules(query, rules)

  if (req.params.mode === 'sql') {
    res.json(query.toSQL())
    return res.end()
  }

  const result = await query

  res.json(result)
  return res.end()
})

module.exports = router
