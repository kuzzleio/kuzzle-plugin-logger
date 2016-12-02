'use strict';

let
  moment = require('moment'),
  winston = require('winston');

module.exports = {
  winston: null,
  addDate: false,

  init: function (config, log) {
    this.winston = new (winston.Logger)({
      transports: [
        new(winston.transports.File)({
          json: false,
          level: config.level || 'error',
          filename: config.filename || 'kuzzle.log',
          formatter: options => {
            var line = `${options.level.toUpperCase()} ${options.message === undefined ? '-' : options.message} ` +
                `${options.metadata ? JSON.stringify(options.metadata) : '-'}`;

            if (config.addDate === undefined  || config.addDate) {
              line = moment().format(config.dateFormat) + ' ' + line;
            }

            return line;
          }
        })
      ]
    });

    // handled at the formatter level
    this.addDate = false;

    this.log = log.bind(this);
  }

};
