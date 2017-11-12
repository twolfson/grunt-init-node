// Load in depdendencies
var assert = require('assert');
var fs = require('fs');
var grunt = require('grunt');
var suppose = require('suppose');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var findit = require('findit');

describe('An UNLICENSE init', function () {
  before(function (done) {
    // Relocate to the test directory
    var actualDir = __dirname + '/actual_files/unlicense';
    rimraf.sync(actualDir);
    mkdirp.sync(actualDir);
    process.chdir(actualDir);

    // Save test dirs for later
    this.actualDir = actualDir;
    this.expectedDir = __dirname + '/expected_files/unlicense';

    // Run the grunt-init script inside of the test directory
    // TODO: Consider how to convert this to a flat file
    suppose('grunt-init', ['node'])
      .debug(process.stdout)
      .on(/Project name/).respond('test-unlicense\n')
      .on(/Description/).respond('Unlicense test project\n')
      .on(/Version/).respond('9.0.0\n')
      .on(/Project git repository/).respond('git://abc\n')
      .on(/Project homepage/).respond('http://abc\n')
      .on(/Project issues tracker/).respond('http://abc/issues\n')
      .on(/License/).respond('UNLICENSE\n')
      .on(/Author name/).respond('Todd Wolfson\n')
      .on(/Author email/).respond('todd@twolfson.com\n')
      .on(/Author url/).respond('http://twolfson.com/\n')
      .on(/Travis CI username/).respond('twolfson\n')
      .on(/Should we include a donations section/).respond('y\n')
      .on(/What versions of node/).respond('>= 4.0.0\n')
      .on(/Main module\/entry point/).respond('lib/test-unlicense\n')
      .on(/What keywords/).respond('a, b, c\n')
      .on(/private/).respond('\n')
      .on(/any changes/).respond('n\n')
      .error(done)
      .end(function (code) {
        assert.strictEqual(code, 0, 'Exited with non-zero code (' + code + ')');
        done();
      });
  });

  it('actual directory matches expected directory', function (done) {
    // Walk the actual directory
    var finder = findit(this.actualDir);
    finder.on('file', function (filepath/*, stats*/) {
      // Load in the files
      var actualFile = fs.readFileSync(filepath, 'utf8');
      var expectedFilepath = filepath.replace('/actual_files/', '/expected_files/');
      var expectedFile = fs.readFileSync(expectedFilepath, 'utf8');

      // If the file is README.md, template out expectedFile
      if (filepath.match(/\/README.md$/)) {
        expectedFile = grunt.template.process(expectedFile, {grunt: grunt});
      }

      // Assert their content is equal
      assert.strictEqual(actualFile, expectedFile, 'Content of "' + filepath + '" did not match as expected');
    });

    // When we are done, callback
    finder.on('end', done);
  });

  it('expected directory does not have more files than actual directory', function (done) {
    var finder = findit(this.expectedDir);
    finder.on('file', function (filepath/*, stats*/) {
      // Get the stats of the actual file (error will throw if non-existant)
      var actualFilepath = filepath.replace('/expected_files/', '/actual_files/');
      var actualStats = fs.statSync(actualFilepath);
      assert(actualStats);
    });
    finder.on('end', done);
  });
});

describe('A private init', function () {
  before(function (done) {
    // Relocate to the test directory
    var actualDir = __dirname + '/actual_files/private';
    rimraf.sync(actualDir);
    mkdirp.sync(actualDir);
    process.chdir(actualDir);

    // Save test dirs for later
    this.actualDir = actualDir;
    this.expectedDir = __dirname + '/expected_files/private';

    // Run the grunt-init script inside of the test directory
    // TODO: Consider how to convert this to a flat file
    suppose('grunt-init', ['node'])
      .debug(process.stdout)
      .on(/Project name/).respond('test-private\n')
      .on(/Description/).respond('Private test project\n')
      .on(/Version/).respond('9.0.0\n')
      .on(/Project git repository/).respond('git://abc\n')
      .on(/Project homepage/).respond('http://abc\n')
      .on(/Project issues tracker/).respond('http://abc/issues\n')
      .on(/License/).respond('UNLICENSE\n')
      .on(/Author name/).respond('Todd Wolfson\n')
      .on(/Author email/).respond('todd@twolfson.com\n')
      .on(/Author url/).respond('http://twolfson.com/\n')
      .on(/Travis CI username/).respond('twolfson\n')
      .on(/Should we include a donations section/).respond('y\n')
      .on(/What versions of node/).respond('>= 4.0.0\n')
      .on(/Main module\/entry point/).respond('lib/test-private\n')
      .on(/What keywords/).respond('a, b, c\n')
      .on(/private/).respond('y\n')
      .on(/any changes/).respond('n\n')
      .error(done)
      .end(function (code) {
        assert.strictEqual(code, 0, 'Exited with non-zero code (' + code + ')');
        done();
      });
  });

  it('adds a private flag to the `package.json`', function () {
    // Load our actual and expected files
    var filepath = __dirname + '/actual_files/private/package.json';
    var actualFile = fs.readFileSync(filepath, 'utf8');
    var expectedFilepath = filepath.replace('/actual_files/', '/expected_files/');
    var expectedFile = fs.readFileSync(expectedFilepath, 'utf8');

    // Assert their content is equal
    assert.strictEqual(actualFile, expectedFile, 'Content of "' + filepath + '" did not match as expected');
  });
});

describe('An MIT init', function () {
  before(function (done) {
    // Relocate to the test directory
    var actualDir = __dirname + '/actual_files/mit';
    rimraf.sync(actualDir);
    mkdirp.sync(actualDir);
    process.chdir(actualDir);

    // Save test dirs for later
    this.actualDir = actualDir;
    this.expectedDir = __dirname + '/expected_files/mit';

    // Run the grunt-init script inside of the test directory
    // TODO: Consider how to convert this to a flat file
    suppose('grunt-init', ['node'])
      .debug(process.stdout)
      .on(/Project name/).respond('test-mit\n')
      .on(/Description/).respond('MIT test project\n')
      .on(/Version/).respond('9.0.0\n')
      .on(/Project git repository/).respond('git://abc\n')
      .on(/Project homepage/).respond('http://abc\n')
      .on(/Project issues tracker/).respond('http://abc/issues\n')
      .on(/License/).respond('MIT\n')
      .on(/Author name/).respond('Todd Wolfson\n')
      .on(/Author email/).respond('todd@twolfson.com\n')
      .on(/Author url/).respond('http://twolfson.com/\n')
      .on(/Travis CI username/).respond('twolfson\n')
      .on(/Should we include a donations section/).respond('y\n')
      .on(/What versions of node/).respond('>= 4.0.0\n')
      .on(/Main module\/entry point/).respond('lib/test-mit\n')
      .on(/What keywords/).respond('a, b, c\n')
      .on(/private/).respond('\n')
      .on(/any changes/).respond('n\n')
      .error(done)
      .end(function (code) {
        assert.strictEqual(code, 0, 'Exited with non-zero code (' + code + ')');
        done();
      });
  });

  it('actual directory matches expected directory', function (done) {
    // Walk the actual directory
    var finder = findit(this.actualDir);
    finder.on('file', function (filepath/*, stats*/) {
      // Load in the files
      var actualFile = fs.readFileSync(filepath, 'utf8');
      var expectedFilepath = filepath.replace('/actual_files/', '/expected_files/');
      var expectedFile = fs.readFileSync(expectedFilepath, 'utf8');

      // If the file is README.md, template out expectedFile
      if (filepath.match(/\/LICENSE-MIT$/)) {
        expectedFile = grunt.template.process(expectedFile, {grunt: grunt});
      }

      // Assert their content is equal
      assert.strictEqual(actualFile, expectedFile, 'Content of "' + filepath + '" did not match as expected');
    });

    // When we are done, callback
    finder.on('end', done);
  });

  it('expected directory does not have more files than actual directory', function (done) {
    var finder = findit(this.expectedDir);
    finder.on('file', function (filepath/*, stats*/) {
      // Get the stats of the actual file (error will throw if non-existant)
      var actualFilepath = filepath.replace('/expected_files/', '/actual_files/');
      var actualStats = fs.statSync(actualFilepath);
      assert(actualStats);
    });
    finder.on('end', done);
  });
});
