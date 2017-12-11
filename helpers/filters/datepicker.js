const db = require('../../entities/db')

module.exports = (query, filter) => {
  query.where(db().raw(`date(${filter.column})`), filter.value)
}
