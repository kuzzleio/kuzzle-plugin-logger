var
  should = require('should'),
  rewire = require('rewire'),
  PluginLogger = rewire('../lib');

describe('The plugin logger initialization', function () {

  var pluginLogger;

  before(function () {
    pluginLogger = new PluginLogger();
  });

  it('should return an error if no config is provided', function () {
    (function() { pluginLogger.init(); }).should.throw();
  });

  it('should return an error if a configuration without "service" is provided', function () {
    (function() { pluginLogger.init({foo: 'bar'}); }).should.throw();
  });

  it('should return an error if the service name is unknown', function () {
    (function() { pluginLogger.init({services: {bar: {level: "info", addDate: true}}}); }).should.throw();
  });

  it('should return pluginLogger object if everything is ok', function () {
    should(pluginLogger.init({services: {stdout: {level: "info", addDate: true}}})).be.Object();
  });

  it('should expose the variable "hooks"', function () {
    should(pluginLogger.hooks).be.Object();
    should(pluginLogger.hooks).not.be.empty();
  });

});