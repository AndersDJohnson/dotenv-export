var fs = require('fs')

function run (path) {
  var file = path || '.env'
  var res = out(file)
  console.log(res)
}

function out (file) {
  return lines(split(read(file)))
}

function outText (text) {
  return lines(split(text))
}

function read (file) {
  return fs.readFileSync(file, 'utf8')
}

function split (text) {
  return text.trim().split(/[\n\r]+/)
}

function lines (ls) {
  var vars = ls.map(line)
  var out = []
  vars.forEach(function (v) {
    if (!v) return
    out.push('export ' + v.name + '=' + v.value)
  })
  return out.join('\n')
}

function line (l) {
  var com = /^\s*#/
  if (com.test(l)) return
  var rex = /^\s*(export\s+)?([\w\.\-]+)\s*=\s*(.*)?\s*$/
  var m = l.match(rex)
  if (m && m[2]) {
    return {
      name: m[2].trim(),
      value: m[3] ? m[3].trim() : ''
    }
  }
}

module.exports = {
  run: run,
  out: out,
  outText: outText,
  read: read,
  split: split,
  lines: lines,
  line: line
}
