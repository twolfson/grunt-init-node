// Load in dependencies
var assert = require('assert');
var testUnlicense = require('../');

// Start our tests
describe('test-unlicense', function () {
  it('exports a function', function () {
    assert.strictEqual(typeof testUnlicense, 'function');
  });
});
