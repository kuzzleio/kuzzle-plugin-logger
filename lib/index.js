var
  hooks = require('./config/hooks'),
  pipes = require('./config/pipes');

module.exports = function Logger () {

  this.logger = null;

  this.init = function (config) {
    if (!config) {
      console.error(new Error('plugin-logger: A configuration is required for plugin logger'));
      return false;
    }

    if (!config.use) {
      console.error(new Error('plugin-logger: The \'use\' attribute, with the service name to use is required'));
      return false;
    }

    if (!config.level) {
      config.level = 'error';
    }

    try {
      this.logger = require('./services')(config.use);
    }
    catch (e) {
      console.error(new Error('plugin-logger: The service ' + config.use + ' is unknown'));
      return false;
    }

    this.logger.init(config);
  };

  this.hooks = hooks;
  this.pipes = pipes;

  this.silly = function (message, event) {
    this.logger.log('silly', event, message);
  };

  this.verbose = function (message, event) {
    this.logger.log('verbose', event, message);
  };

  this.info = function (message, event) {
    this.logger.log('info', event, message);
  };

  this.debug = function (message, event) {
    this.logger.log('debug', event, message);
  };

  this.warn = function (message, event) {
    this.logger.log('warn', event, message);
  };

  this.error = function (message, event) {
    this.logger.log('error', event, message);
  };

  this.addUsernameToto = function (requestObject) {
    console.log('**** ok', requestObject);
    requestObject.data.username = 'toto';
    return requestObject;
  }
};