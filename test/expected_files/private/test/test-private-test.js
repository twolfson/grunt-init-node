// Load in dependencies
var assert = require('assert');
var testPrivate = require('../');

// Start our tests
describe('test-unlicense', function () {
  it('returns awesome', function () {
    assert.strictEqual(testPrivate(), 'awesome');
  });
});
