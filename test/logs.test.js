var
  should = require('should'),
  PluginLogger = require('../lib'),
  config = require('../lib/config/hooks');

describe('The plugin logger', function () {

  var
    pluginLogger,
    // Store all defined function present in config/hooks
    definedFunctions = [];

  before(function () {
    pluginLogger = new PluginLogger();

    var fnName;
    Object.keys(config).forEach(function (event) {
      fnName = config[event];

      if (definedFunctions.indexOf(fnName) === -1) {
        definedFunctions.push(fnName);
      }
    });
  });

  it('should have all functions defined in hooks', function () {
    definedFunctions.forEach(function (fn) {
      should(pluginLogger[fn]).be.Function();
    });
  });

  it('should have all functions return false if "isDummy" is true', function () {
    pluginLogger.isDummy = true;

    definedFunctions.forEach(function (fn) {
      should(pluginLogger[fn]()).be.false();
    });
  });

  it('should have all functions calling the logger', function () {
    var
      nbFunctions = definedFunctions.length,
      nbCalled = 0;

    // Mock the logger function
    pluginLogger.logger = {
      log: function () {
        nbCalled++;
      }
    };
    pluginLogger.isDummy = false;

    definedFunctions.forEach(function (fn) {
      pluginLogger[fn]();
    });

    should(nbCalled).be.exactly(nbFunctions);
  });

});