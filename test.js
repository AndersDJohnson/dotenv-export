var test = require('tape')
var index = require('.')

test('line', function (t) {

    t.deepEqual(index.line('FOO=BAR'), {name: 'FOO', value: 'BAR'})
    t.deepEqual(index.line('FOO=\'BAR\''), {name: 'FOO', value: '\'BAR\''})
    t.deepEqual(index.line('FOO="BAR"'), {name: 'FOO', value: '"BAR"'})
    t.deepEqual(index.line('export FOO=BAR'), {name: 'FOO', value: 'BAR'})
    t.deepEqual(index.line('#export FOO=BAR'), undefined)
    t.deepEqual(index.line('  #  export FOO = BAR  '), undefined)
    t.deepEqual(index.line('FOO = BAR  '), {name: 'FOO', value: 'BAR'})
    t.deepEqual(index.line('  FOO  = BAR'), {name: 'FOO', value: 'BAR'})
    t.deepEqual(index.line('exported = Yes  '), {name: 'exported', value: 'Yes'})
    t.deepEqual(index.line('export ed = Yes  '), {name: 'ed', value: 'Yes'})
    t.deepEqual(index.line('export A='), {name: 'A', value: ''})

    t.end()
})

test('text', function (t) {

    t.equal(
      index.outText([
        'FOO=BAR',
        ' BAZ =  "BING" ',
        ' export ROO = TOO '
      ].join('\n')),
      [
        'export FOO=BAR',
        'export BAZ="BING"',
        'export ROO=TOO'
      ].join('\n')
    )

    t.end()
})

test('escapes', function (t) {

  t.equal(
    index.outText([
      'DB_PASS="some`password"',
      'DB_PASS2="some${foo}password"',
      'DB_PASS3="some$password"',
      'DB_PASS4="some{password"',
      'DB_PASS5="some}password"'
    ].join('\n')),
    [
      'export DB_PASS="some\\`password"',
      'export DB_PASS2="some\\$\\{foo\\}password"',
      'export DB_PASS3="some\\$password"',
      'export DB_PASS4="some\\{password"',
      'export DB_PASS5="some\\}password"'
    ].join('\n')
  )

  t.end()
})
