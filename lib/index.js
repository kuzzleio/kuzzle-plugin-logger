var
  hooks = require('./config/hooks'),
  util = require('util');

module.exports = function Logger () {

  this.logger = null;
  this.isDummy = false;

  this.init = function (config, isDummy) {
    if (!config) {
      /*eslint no-console: 0*/
      console.error(new Error('plugin-logger: A configuration is required for plugin logger'));
      return false;
    }

    if (!config.service) {
      /*eslint no-console: 0*/
      console.error(new Error('plugin-logger: The \'service\' attribute, with the service name to use is required'));
      return false;
    }

    this.isDummy = isDummy;

    if (!config.level) {
      config.level = 'error';
    }

    try {
      this.logger = require('./services')(config.service);
    }
    catch (e) {
      /*eslint no-console: 0*/
      console.error(new Error('plugin-logger: The service ' + config.service + ' is unknown'));
      return false;
    }

    this.logger.init(config);

    return this;
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

    if (util.isError(message)) {
      this.logger.log('error', event, message.message + '\n' + message.stack);
    } else {
      this.logger.log('error', event, message);
    }
  };
};
