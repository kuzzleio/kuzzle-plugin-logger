var
  winston = require('winston');

module.exports = {

  winston: null,
  addDate: false,

  init: function (config, log) {
    this.winston = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)({ level: config.level || 'error' })
      ]
    });

    this.addDate = (config.addDate === undefined) || config.addDate;
    this.dateFormat = config.dateFormat;
    this.log = log.bind(this);
  }
};
