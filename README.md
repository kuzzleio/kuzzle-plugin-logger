[![Build Status](https://travis-ci.org/kuzzleio/kuzzle-plugin-logger.svg?branch=master)](https://travis-ci.org/kuzzleio/kuzzle-plugin-logger)
![logo](https://github.com/kuzzleio/kuzzle/blob/master/docs/images/logo.png)

# Plugin logger

This plugin allow to log messages from Kuzzle with:
* winston (implemented)
* logstash (not implemented yet)

By default, this plugin is already installed in Kuzzle.

# Manifest

This plugin doesn't need any right.

# Configuration

Configuration that you can override in your `config/customPlugins.json` file in Kuzzle:

| Name | Default value | Available | Description                 |
|------|---------------|-----------|-----------------------------|
| service  | `winston`     | `winston` | Define which logger to use. |
| level | `info`   | in ascending order: `silly`, `verbose`, `info`, `debug`, `warn`, `error` | Debug level to apply. Messages with a lower level are not logged. |
| addDate | `true` | `true` / `false` | Define if you want to prefix your messages with the date. |

# About Kuzzle

For UI and linked objects developers, Kuzzle is an open-source solution that handles all the data management
(CRUD, real-time storage, search, high-level features, etc;).

Kuzzle features are accessible through a secured API. It can be used through a large choice of protocols such as REST, Websocket or Message Queuing protocols.