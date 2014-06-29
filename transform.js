var through = require('through')

var upper_stream = through(to_upper)

process.stdin.pipe(upper_stream).pipe(process.stdout)

function to_upper(buf) {
  upper_stream.queue(buf.toString().toUpperCase())
}
