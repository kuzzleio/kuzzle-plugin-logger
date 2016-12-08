'use strict';

const
  hooks = require('./config/hooks'),
  moment = require('moment');

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
    let prepared = prepareMessage(message);

    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('silly', event, prepared));
  };

  this.verbose = function (message, event) {
    let prepared = prepareMessage(message);

    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('verbose', event, prepared));
  };

  this.info = function (message, event) {
    let prepared = prepareMessage(message);

    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('info', event, prepared));
  };

  this.debug = function (message, event) {
    let prepared = prepareMessage(message);

    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('debug', event, prepared));
  };

  this.warn = function (message, event) {
    let prepared = prepareMessage(message);

    if (this.isDummy) {
      return false;
    }

    this.loggers.forEach(logger => logger.log('warn', event, prepared));
  };

  this.error = function (message, event) {
    if (this.isDummy) {
      return false;
    }

    /*
     Pretty print Kuzzle errors.
     "instanceof" cannot be used here since error objects are
     serialized to be delivered to this plugin's threads
     */
    if (message && typeof message === 'object' && message.message && message.status) {
      if (message.stack) {
        this.loggers.forEach(logger => logger.log('error', event, `(${message.status}) ${message.message}\n${message.stack}`));
      }
      else {
        this.loggers.forEach(logger => logger.log('error', event, `(${message.status}) ${message.message}`));
      }
    } else {
      this.loggers.forEach(logger => logger.log('error', event, prepareMessage(message)));
    }
  };
};

function log (level, event, message) {
  var prefix = `[${event.toUpperCase()}] `;

  if (this.addDate) {
    prefix = moment().format(this.dateFormat) +  ' ' + prefix;
  }

  this.winston.log(level, prefix + message);
}

/**
 * Since loggers only take strings as messages, we make sure this is
 * what they receive. Otherwise, empty message log are printed.
 *
 * @param {*} message to log
 * @return {string}
 */
function prepareMessage(message) {
  return (typeof message === 'string') ? message : JSON.stringify(message);
}
