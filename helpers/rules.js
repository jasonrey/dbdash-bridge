const db = require('../entities/db')

const buildRules = (query, rules) => {
  return rules.map(rule => {
    if (rule.type === 'conditions') {
      return query[rule.connector === 'or' ? 'orWhere' : 'where'](function () {
        buildRules(this, rule.rules)
      })
    }

    return query[rule.connector === 'or' ? 'orWhere' : 'where'](rule.column, rule.comparison || '=', rule.raw ? db().raw(rule.value) : rule.value)
  })
}

module.exports = buildRules
