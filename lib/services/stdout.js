var
  winston = require('winston');

module.exports = {

  winston: null,
  addDate: false,

  init: function (config) {
    this.winston = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({ level: config.level })
      ]
    });

    this.addDate = config.addDate;
  },

  log: function (level, event, message) {
    var prefix = '';

    if (this.addDate) {
      prefix = '[' + (new Date()).toISOString() + ']: ';
    }

    prefix += event + ': ';

    if (typeof message === 'object') {
      return this.winston.log(level, prefix, message);
    }

    this.winston.log(level, prefix + message);
  }
};