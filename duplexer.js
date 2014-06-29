var spawn = require('child_process').spawn

var duplexer = require('duplexer')

module.exports = spawn_duplex

function spawn_duplex(command, args) {
  var cmd = spawn(command, args)
  return duplexer(cmd.stdin, cmd.stdout)
}
