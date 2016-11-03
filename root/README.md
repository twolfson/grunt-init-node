# {%= name %} [![Build status](https://travis-ci.org/{%= travis_username %}/{%= name %}.svg?branch=master)](https://travis-ci.org/{%= travis_username %}/{%= name %})

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
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint via `npm run lint` and test via `npm test`.
{% if (include_donations) { %}
## Donating
Support this project and [others by twolfson][twolfson-projects] via [donations][twolfson-support-me].

<http://twolfson.com/support-me>

[twolfson-projects]: http://twolfson.com/projects
[twolfson-support-me]: http://twolfson.com/support-me
{% } %}{% if (unlicense) { %}
## Unlicense
As of {%= grunt.template.today('mmm dd yyyy') %}, {%= author_name %} has released this repository and its contents to the public domain.

It has been released under the [UNLICENSE][].

[UNLICENSE]: UNLICENSE{% } else if (license) { %}
## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}

Licensed under the {%= license %} license.{% } %}
