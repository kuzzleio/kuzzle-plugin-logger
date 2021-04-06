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

const services = require('./services');

class Logger {

  constructor () {
    this.hooks = {
      'log:silly': 'silly',
      'log:verbose': 'verbose',
      'log:info': 'info',
      'log:debug': 'debug',
      'log:warn': 'warn',
      'log:error': 'error'
    };
    this.loggers = [];
  }

  init (config, context) {
    const defaultConfig = {
      services: {
        stdout: {
          level: 'info',
          showLevel: false
        }
      }
    };
    const conf = Object.assign(defaultConfig, config);

    Object.keys(conf.services).forEach(serviceName => {
      if (!services[serviceName]) {
        const InternalError = context.errors.InternalError;
        throw new InternalError(`[kuzzle-plugin-logger] Unable to find service ${serviceName}`);
      }

      const logger = new services[serviceName](conf.services[serviceName]);
      this.loggers.push(logger);
    });

    return this;
  }

  _dispatch (level, event, message) {
    for (const logger of this.loggers) {
      logger.log(level, event, message);
    }
  }

  silly (message, event) {
    this._dispatch('silly', event, this._prepareMessage(message));
  }

  verbose (message, event) {
    this._dispatch('verbose', event, this._prepareMessage(message));
  }

  info (message, event) {
    this._dispatch('info', event, this._prepareMessage(message));
  }

  debug (message, event) {
    this._dispatch('debug', event, this._prepareMessage(message));
  }

  warn (message, event) {
    this._dispatch('warn', event, this._prepareMessage(message));
  }

  error (message, event) {
    let output = '';

    /*
     Pretty print Kuzzle errors.
     */
    if (message && typeof message === 'object' && message.message) {
      if (typeof message.status === 'number') {
        output = `(${message.status}) `;
      }

      output += message.stack || message.message;
    }
    else {
      output = this._prepareMessage(message);
    }

    this._dispatch('error', event, output);
  }

  /**
   * Since loggers only take strings as messages, we make sure this is
   * what they receive. Otherwise, empty message log are printed.
   *
   * @private
   * @param {*} message to log
   * @return {string}
   */
  _prepareMessage(message) {
    return (typeof message === 'string') ? message : JSON.stringify(message);
  }

}

module.exports = Logger;
