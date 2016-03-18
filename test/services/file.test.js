var
  should = require('should'),
  serviceFile = require('../../lib/services/file');

describe('The winston service', function () {

  it('should have a function init', function () {
    should(serviceFile.init).be.Function();
  });

  it('should throw an error if no "outputs" is provided', function () {
    (function() { serviceFile.init({addDate: false}); }).should.throw();
  });

  it('should throw an error if one of outputs strategies have no filename', function () {
    (function() { serviceFile.init({outputs: {error: {}, warning: {filename: 'toto.log'}}}); }).should.throw();
  });

  it('should set the level to error if config is not provided', function () {
    serviceFile.init({outputs: {error: {filename: 'toto.log'}, warning: {level: 'warn', filename: 'toto.log'}}});

    should(serviceFile.winston.transports.error).have.property('level');
    should(serviceFile.winston.transports.error.level).be.exactly('error');

    should(serviceFile.winston.transports.warning).have.property('level');
    should(serviceFile.winston.transports.warning.level).be.exactly('warn');
  });

  it('should log object without date if addDate is false in config', function () {
    serviceFile.init({outputs: {error: {filename: 'toto.log'}}});

    // Mock the winston module
    serviceFile.winston.log = function (level, prefix, message) {
      should(level).be.exactly('debug');
      should(prefix).be.exactly('event: ');

      should(message).be.Object();
      should(message).have.property('foo');
      should(message.foo).be.exactly('bar');
    };

    serviceFile.log('debug', 'event', {foo: 'bar'});
  });

  it('should log object with date if addDate is true in config', function () {
    serviceFile.init({addDate: true, outputs: {error: {filename: 'toto.log'}}});

    // Mock the winston module
    serviceFile.winston.log = function (level, prefix, message) {
      should(level).be.exactly('debug');
      // Something like "[2015-10-05T14:28:09.580Z]:event: "
      should(prefix).match(/^\[\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z\]: event: $/);

      should(message).be.Object();
      should(message).have.property('foo');
      should(message.foo).be.exactly('bar');
    };

    serviceFile.log('debug', 'event', {foo: 'bar'});
  });

  it('should log as message if it\'s not an object', function () {
    serviceFile.init({outputs: {error: {filename: 'toto.log'}}});

    // Mock the winston module
    serviceFile.winston.log = function (level, message) {
      should(level).be.exactly('debug');
      should(message).be.exactly('event: foo');
    };

    serviceFile.log('debug', 'event', 'foo');
  });

  it('should log as message and add date if addDate is true', function () {
    serviceFile.init({addDate: true, outputs: {error: {filename: 'toto.log'}}});

    // Mock the winston module
    serviceFile.winston.log = function (level, message) {
      should(level).be.exactly('debug');
      should(message).match(/^\[\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z\]: event: foo$/);
    };

    serviceFile.log('debug', 'event', 'foo');
  });
});