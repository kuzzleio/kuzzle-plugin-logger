var
  hooks = require('./config/hooks');

module.exports = function Logger () {

  this.logger = null;
  this.isDummy = false;

  this.init = function (config, isDummy) {
    if (!config) {
      console.error(new Error('plugin-logger: A configuration is required for plugin logger'));
      return false;
    }

    if (!config.use) {
      console.error(new Error('plugin-logger: The \'use\' attribute, with the service name to use is required'));
      return false;
    }

    this.isDummy = isDummy;

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

  this.silly = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.logger.log('silly', event, message);
  };

  this.verbose = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.logger.log('verbose', event, message);
  };

  this.info = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.logger.log('info', event, message);
  };

  this.debug = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.logger.log('debug', event, message);
  };

  this.warn = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.logger.log('warn', event, message);
  };

  this.error = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.logger.log('error', event, message);
  };
};