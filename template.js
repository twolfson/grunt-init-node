/*
 * grunt-init-node
 * https://gruntjs.com/
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */

// Load in dependencies
var _s = require('underscore.string');

// Basic template description.
exports.description = 'Create a Node.js module, including mocha unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ shouldn\'t contain \'node\' or \'js\' and should ' +
  'be a unique ID not already in use at search.npmjs.org.';

// Template-specific notes to be displayed after question prompts.
exports.after = [
  'If you used Travis CI, be sure to activate it via https://travis-ci.org/profile'
].join('\n');

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function (grunt, init, done) {
  init.prompts.travis_username = {
    name: 'travis_username',
    message: 'Travis CI username (adds Travis CI badge)'
  };

  init.prompts.gratipay_username = {
    name: 'gratipay_username',
    message: 'Gratipay username (adds Gratipay badge)'
  };

  init.process({type: 'node'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'UNLICENSE'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('travis_username'),
    init.prompt('gratipay_username'),
    init.prompt('node_version', '>= 0.8.0'),
    init.prompt('main'),
    {
      name: 'keywords',
      message: 'What keywords relate to this plugin (comma separated)?'
    },
    {
      name: 'private',
      message: 'Should this project be private?',
      'default': 'y/N',
      sanitize: function (value, data, done) {
        // If the value is the default, swap it with `N`
        if (value === 'y/N') {
          value = 'N';
        }

        // Check the values ('Y'.toLowerCase() === 'y')
        done(null, value.toLowerCase() === 'y');
      }
    }
  ], function (err, props) {
    // Set up dependencies
    props.dependencies = {};
    props.devDependencies = {
      jscs: '~1.7.3',
      jshint: '~2.5.10',
      mocha: '~2.0.1',
      'twolfson-style': '~1.0.0'
    };

    // Redefine safe name to our standards
    // https://github.com/gruntjs/grunt-init/blob/0327945c4f48cb8b320ebc051b7cb7852debfb3d/tasks/init.js#L99-L106
    props.js_safe_name = _s.camelize(props.js_safe_name);
    props.js_test_safe_name = props.js_safe_name === 'test' ? 'myTest' : props.js_safe_name;

    // Break up the keywords by commas
    var keywords = props.keywords;
    keywords = keywords ? keywords.split(',') : [];

    // Trim each keyword and save
    keywords = keywords.map(function (str) {
      return str.trim();
    });
    props.keywords = keywords;

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // If the licenses contain an Unlicense, pluck it
    props.unlicense = props.licenses.filter(function (license) {
      return license.match(/^UNLICENSE$/i);
    })[0];

    // If an unlicense was found, add it to output
    if (props.unlicense) {
      files.UNLICENSE = __dirname + '/licenses/UNLICENSE';
      props.licenses = [];
    } else {
      // Add properly-named license files.
      init.addLicenseFiles(files, props.licenses);
    }

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props, function (pkg) {
      // Define scripts
      pkg.scripts = {
        lint: 'jshint lib/ test/ && jscs lib/ test/',
        pretest: 'twolfson-style install',
        test: 'npm run lint && mocha --reporter dot'
      };

      // If there was UNLICENSE, add it as a license
      if (props.unlicense) {
        pkg.licenses.push({
          type: 'UNLICENSE',
          url: props.homepage + '/blob/master/UNLICENSE'
        });
      }

      // If this project is private, mark it appropriately
      if (props['private']) {
        pkg['private'] = true;
      }

      // Return the package
      return pkg;
    });

    // All done!
    done();
  });
};
