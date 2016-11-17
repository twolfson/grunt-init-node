// Load in dependencies
var assert = require('assert');
var testUnlicense = require('../');

// Start our tests
describe('test-unlicense', function () {
  it('returns awesome', function () {
    assert.strictEqual(testUnlicense(), 'awesome');
  });
});
