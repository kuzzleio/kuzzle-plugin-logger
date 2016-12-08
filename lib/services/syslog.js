'use strict';

let
  winston = require('winston');

require('winston-syslog');

module.exports = {
  init: function (config, log) {
    let transportOptions = {level: 'error'};

    winston.setLevels(winston.config.syslog.levels);

    [
      'level',
      'host',
      'port',
      'protocol',
      'path',
      'pid',
      'facility',
      'localhost',
      'type',
      'app_name',
      'eol'
    ].forEach(opt => {
      if (config[opt] !== undefined) {
        transportOptions[opt] = config[opt];
      }
    });

    this.winston = new (winston.Logger)({
      transports: [
        new (winston.transports.Syslog)(transportOptions)
      ]
    });

    this.addDate = (config.addDate === undefined) || config.addDate;
    this.dateFormat = config.dateFormat;
    this.log = log.bind(this);
  }
};
