exports.foo = 'foo';
var { bar } = require('./b');

console.log('run in a', bar);
