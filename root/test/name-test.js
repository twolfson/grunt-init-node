// Load in dependencies
var assert = require('assert');
var {%= js_safe_name %} = require('../');

// Start our tests
describe('{%= name %}', function () {
  it('returns awesome', function () {
    assert.strictEqual({%= js_safe_name %}(), 'awesome');
  });
});
