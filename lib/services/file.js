var
  winston = require('winston');

module.exports = {

  winston: null,
  addDate: false,

  init: function (config) {
    if (!config.outputs) {
      console.error(new Error('The service file must contains an attribute "outputs" that contains different strategies for levels'));
      return null;
    }

    var transports = Object.keys(config.outputs).map(configName => {
      if (!config.outputs[configName].filename) {
        console.error(new Error('In service file, each strategies must have an attribute "filename"'));
        return null;
      }

      return new (winston.transports.File)({
        level: config.outputs[configName].level || 'info',
        name: configName,
        filename: config.outputs[configName].filename
      })
    });

    this.winston = new (winston.Logger)({
      transports: transports
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