var zlib = require('zlib')

var combine = require('stream-combiner')
  , through = require('through')
  , split = require('split')

module.exports = book_stream

function book_stream() {
  var parse_books = through(capture_books, end)
    , list = []

  return combine(
      split()
    , parse_books
    , zlib.createGzip()
  )

  function capture_books(str) {
    try {
      var obj = JSON.parse(str)
    } catch(e) {
      return
    }

    if (obj.type === 'genre') return list.push({genre: obj.name, books: []})
    list[list.length - 1].books.push(obj.name)
  }

  function end() {
    for (var i = 0, l = list.length; i < l; ++i) {
      parse_books.queue(JSON.stringify(list[i]) + '\n')
    }
  }
}
