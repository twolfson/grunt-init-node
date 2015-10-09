// Load in dependencies
var assert = require('assert');
var testMit = require('../');

// Start our tests
describe('test-mit', function () {
  it('returns awesome', function () {
    assert.strictEqual(testMit(), 'awesome');
  });
});
