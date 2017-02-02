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

test('test', function (t) {

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
