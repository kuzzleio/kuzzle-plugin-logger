/*
 * Kuzzle, a backend software, self-hostable and ready to use
 * to power modern apps
 *
 * Copyright 2015-2017 Kuzzle
 * mailto: support AT kuzzle.io
 * website: http://kuzzle.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const fs = require('fs');

const winston = require('winston');

const Service = require('./service');

class File extends Service {

  constructor (customConfig) {
    const defaultConfig = { level: 'error', filename: 'kuzzle.log' };
    const config = Object.assign(defaultConfig, customConfig);

    super(config);

    // default file transport sets timestamp to true
    if (config.addDate) {
      this.addDate = true;
    }

    delete config.addDate;
    delete config.dateFormat;

    this.winston = winston.createLogger({
      transports: [
        new winston.transports.File(config)
      ]
    });

    if (config.filename) {
      if (fs.existsSync(config.filename)) {
        fs.accessSync(config.filename, fs.W_OK | fs.R_OK);
      }
    }
  }
}

module.exports = File;
