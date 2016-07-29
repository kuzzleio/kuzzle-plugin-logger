var
  hooks = require('./config/hooks'),
  moment = require('moment'),
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

    Object.keys(config.services).forEach(serviceName => {
      var logger = require('./services')(serviceName);
      logger.init(config.services[serviceName], log);
      this.loggers.push(logger);
    });

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

function log (level, event, message) {
  var prefix = `[${event.toUpperCase()}] `;

  if (this.addDate) {
    prefix = moment().format(this.dateFormat) +  ' ' + prefix;
  }

  if (typeof message === 'object') {
    return this.winston.log(level, prefix, message);
  }

  this.winston.log(level, prefix + message);
}
