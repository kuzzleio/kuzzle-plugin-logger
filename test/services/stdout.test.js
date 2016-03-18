var
  should = require('should'),
  serviceStdout = require('../../lib/services/stdout');

describe('The stdout service', function () {

  it('should have a function init', function () {
    should(serviceStdout.init).be.Function();
  });

  it('should set the level to error if config is not provided', function () {

    serviceStdout.init({addDate: false});

    should(serviceStdout.winston.transports.console).have.property('level');
    should(serviceStdout.winston.transports.console.level).be.exactly('error');
  });

  it('should set the level if config is provided', function () {
    serviceStdout.init({level: 'info', addDate: false});

    should(serviceStdout.winston.transports.console).have.property('level');
    should(serviceStdout.winston.transports.console.level).be.exactly('info');
  });

  it('should log object without date if addDate is false in config', function () {
    serviceStdout.init({level: 'debug', addDate: false});

    // Mock the winston module
    serviceStdout.winston.log = function (level, prefix, message) {
      should(level).be.exactly('debug');
      should(prefix).be.exactly('event: ');

      should(message).be.Object();
      should(message).have.property('foo');
      should(message.foo).be.exactly('bar');
    };

    serviceStdout.log('debug', 'event', {foo: 'bar'});
  });

  it('should log object with date if addDate is true in config', function () {
    serviceStdout.init({level: 'debug', addDate: true});

    // Mock the winston module
    serviceStdout.winston.log = function (level, prefix, message) {
      should(level).be.exactly('debug');
      // Something like "[2015-10-05T14:28:09.580Z]:event: "
      should(prefix).match(/^\[\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z\]: event: $/);

      should(message).be.Object();
      should(message).have.property('foo');
      should(message.foo).be.exactly('bar');
    };

    serviceStdout.log('debug', 'event', {foo: 'bar'});
  });

  it('should log as message if it\'s not an object', function () {
    serviceStdout.init({level: 'debug', addDate: false});

    // Mock the winston module
    serviceStdout.winston.log = function (level, message) {
      should(level).be.exactly('debug');
      should(message).be.exactly('event: foo');
    };

    serviceStdout.log('debug', 'event', 'foo');
  });

  it('should log as message and add date if addDate is true', function () {
    serviceStdout.init({level: 'debug', addDate: true});

    // Mock the winston module
    serviceStdout.winston.log = function (level, message) {
      should(level).be.exactly('debug');
      should(message).match(/^\[\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+Z\]: event: foo$/);
    };

    serviceStdout.log('debug', 'event', 'foo');
  });
});