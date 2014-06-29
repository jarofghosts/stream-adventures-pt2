var crypto = require('crypto')
  , zlib = require('zlib')

var tar = require('tar').Parse()
  , through = require('through')

var output = through(noop)

tar.on('entry', emit_entry)

process.stdin
  .pipe(crypto.createDecipher(process.argv[2], process.argv[3]))
  .pipe(zlib.createGunzip())
  .pipe(tar)

output.pipe(process.stdout)

function emit_entry(entry) {
  if (entry.type !== 'File') return
  var md5 = crypto.createHash('md5', {encoding: 'hex'})
  entry.pipe(md5).pipe(through(null, function() {
    output.queue(' ' + entry.path + '\n')
  }))
}

function noop() {}
