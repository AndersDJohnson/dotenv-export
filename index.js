var fs = require('fs')

function run () {
  var file = '.env'
  var out = lines(parse(read(file)))
  console.log(out)
}

function read (file) {
  return fs.readFileSync(file, 'utf8')
}

function parse (text) {
  return text.trim().split(/[\n\r]+/)
}

function lines (ls) {
  var vars = ls.map(line)
  var out = ''
  vars.forEach(function (v) {
    if (!v) return
    out += 'export ' + v.name + '=' + v.value + '\n'
  })
  return out
}

function line (l) {
  var com = /^\s*#/
  if (com.test(l)) return
  var rex = /^\s*(export\s+)?([\w\.\-]+)\s*=\s*(.*)?\s*$/
  var m = l.match(rex)
  if (m && m[2]) {
    return {
      name: m[2],
      value: m[3]
    }
  }
}

module.exports = {
  run: run
}
