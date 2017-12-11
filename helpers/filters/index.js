const glob = require('glob')
const path = require('path')
const filters = glob
  .sync(`${__dirname}/*.js`, {
    ignore: `${__dirname}/index.js`
  })
  .reduce((result, helper) => {
    result[path.basename(helper, '.js')] = require(helper)
    return result
  }, {})

const buildFilters = (query, rules) => rules.map(rule => filters[rule.type](query, rule))

module.exports = buildFilters
