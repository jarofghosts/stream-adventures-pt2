var through = require('through')
  , split = require('split')

var caseify = through(change_case)
  , is_even = false

process.stdin.pipe(split()).pipe(caseify).pipe(process.stdout)

function change_case(buf) {
  caseify.queue(
      buf.toString()[is_even ? 'toUpperCase' : 'toLowerCase']() + '\n'
  )

  is_even = !is_even
}
