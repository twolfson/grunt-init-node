# {%= name %} [![Build status](https://travis-ci.org/{%= travis_username %}/{%= name %}.png?branch=master)](https://travis-ci.org/{%= travis_username %}/{%= name %})

{%= description %}

## Getting Started
Install the module with: `npm install {%= name %}`

```js
var {%= js_safe_name %} = require('{%= name %}');
{%= js_safe_name %}(); // 'awesome'
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via [grunt](https://github.com/gruntjs/grunt) and test via `npm test`.
{% if (gratipay_username) { %}
## Donating
Support this project and [others by {%= gratipay_username %}][gratipay] via [gratipay][].

[![Support via Gratipay][gratipay-badge]][gratipay]

[gratipay-badge]: https://cdn.rawgit.com/gratipay/gratipay-badge/2.x.x/dist/gratipay.png
[gratipay]: https://www.gratipay.com/{%= gratipay_username %}/
{% } %}{% if (unlicense) { %}
## Unlicense
As of {%= grunt.template.today('mmm dd yyyy') %}, {%= author_name %} has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE{% } else if (licenses.length) { %}
## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}

Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.{% } %}
