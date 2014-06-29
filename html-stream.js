var trumpet = require('trumpet')
  , through = require('through')

var uppercase_stream = through(to_upper)
  , html_stream = trumpet()
  , loud_stream

process.stdin.pipe(html_stream).pipe(process.stdout)

loud_stream = html_stream.select('.loud').createStream()

loud_stream.pipe(uppercase_stream).pipe(loud_stream)

function to_upper(buf) {
  uppercase_stream.queue(buf.toString().toUpperCase())
}
