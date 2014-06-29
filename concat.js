var concat = require('concat-stream')

process.stdin.pipe(concat(reverse))

function reverse(buf) {
  if (!buf) return
  console.log(buf.toString().split('').reverse().join(''))
}
