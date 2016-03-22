var
  hooks = require('./config/hooks'),
  util = require('util');

module.exports = function Logger () {

  this.loggers = [];
  this.isDummy = false;

  this.init = function (config, context, isDummy) {
    if (!config) {
      throw new Error('plugin-logger: A configuration is required for plugin logger');
    }

    if (!config.services) {
      throw new Error('plugin-logger: The \'services\' attribute, with services configurations to use is required');
    }

    this.isDummy = isDummy;

    try {
      var logger;

      Object.keys(config.services).forEach(serviceName => {
        logger = require('./services')(serviceName);
        logger.init(config.services[serviceName]);
        this.loggers.push(logger);
      });
    }
    catch (e) {
      throw e;
    }

    return this;
  };

  this.hooks = hooks;

  this.silly = function (message, event) {
    if (this.isDummy) {
      return false;
    }


    this.loggers.forEach(logger => logger.log('silly', event, message));
  };

  this.verbose = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('verbose', event, message));
  };

  this.info = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('info', event, message));
  };

  this.debug = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('debug', event, message));
  };

  this.warn = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('warn', event, message));
  };

  this.error = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    if (util.isError(message)) {
      this.loggers.forEach(logger => logger.log('error', event, message.message + '\n' + message.stack));
    } else {
      this.loggers.forEach(logger => logger.log('error', event, message));
    }
  };
};
