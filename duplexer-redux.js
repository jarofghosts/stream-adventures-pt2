var duplexer = require('duplexer')
  , through = require('through')

module.exports = country_count

function country_count(counter) {
  var write = through(count, end)
    , countries = {}

  return duplexer(write, counter)

  function count(obj) {
    if (!countries[obj.country]) countries[obj.country] = 0
    countries[obj.country]++ 
  }

  function end() {
    counter.setCounts(countries)
  }
}
