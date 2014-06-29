var http = require('http')

var through = require('through')

var upper_stream = through(to_upper)

http.createServer(handle_request).listen(process.argv[2])

function handle_request(req, res) {
  if (req.method.toLowerCase() !== 'post') return req.pipe(res)
  req.pipe(upper_stream).pipe(res)
}

function to_upper(buf) {
  this.queue(buf.toString().toUpperCase())
}
