var
  should = require('should'),
  rewire = require('rewire'),
  PluginLogger = rewire('../lib');

describe('The plugin logger initialization', function () {

  var pluginLogger;

  before(function () {
    PluginLogger.__set__({
      console: {
        log: function () {},
        error: function () {}
      }
    });

    pluginLogger = new PluginLogger();
  });

  it('should return an error if no config is provided', function () {
    should(pluginLogger.init()).be.false();
  });

  it('should return an error if a configuration without "service" is provided', function () {
    should(pluginLogger.init({foo: 'bar'})).be.false();
  });

  it('should return an error if the service name is unknown', function () {
    should(pluginLogger.init({service: 'bar'})).be.false();
  });

  it('should return pluginLogger object if everything is ok', function () {
    should(pluginLogger.init({service: 'winston'})).be.Object();
  });

  it('should set the level to error if config is not provided', function () {
    var config = {
      service: 'winston'
    };

    pluginLogger.init(config);
    should(config).have.property('level');
    should(config.level).be.exactly('error');

    config.level = 'info';
    pluginLogger.init(config);
    should(config).have.property('level');
    should(config.level).be.exactly('info');
  });

  it('should expose the variable "hooks"', function () {
    should(pluginLogger.hooks).be.Object();
    should(pluginLogger.hooks).not.be.empty();
  });

});