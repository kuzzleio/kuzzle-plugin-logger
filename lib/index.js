var
  hooks = require('./config/hooks');

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

  this.silly = function (message) {
    this.logger.log('silly', message);
  };

  this.verbose = function (message) {
    this.logger.log('verbose', message);
  };

  this.info = function (message) {
    this.logger.log('info', message);
  };

  this.debug = function (message) {
    this.logger.log('debug', message);
  };

  this.warn = function (message) {
    this.logger.log('warn', message);
  };

  this.error = function (message) {
    this.logger.log('error', message);
  };
};