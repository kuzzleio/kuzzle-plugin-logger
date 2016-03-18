[![Build Status](https://travis-ci.org/kuzzleio/kuzzle-plugin-logger.svg?branch=master)](https://travis-ci.org/kuzzleio/kuzzle-plugin-logger)

![logo](https://raw.githubusercontent.com/kuzzleio/kuzzle/master/docs/images/logo.png)

# Plugin logger

This plugin allows to log messages from [Kuzzle](https://github.com/kuzzleio/kuzzle) with:
* stdout: output logs directly in standard output
* file: write logs in files

By default, this plugin is already installed in Kuzzle.

# Manifest

This plugin doesn't need any right.

# Configuration

You can override the configuration in your `config/customPlugins.json` file in Kuzzle.
You can choose multi services.

By default, the configuration is:

```json
{
  "services": {
    "file": {
      "outputs": {
        "error": {
          "level": "error",
          "name": "error-file",
          "filename": "kuzzle-error.log"
        },
        "warning": {
          "level": "warn",
          "name": "warning-file",
          "filename": "kuzzle-warning.log"
        }
      },
      "addDate": true
    },
    "stdout": {
      "level": "info",
      "addDate": true
    }
  }
}
```

That means:
* We use the service `file` for write logs in a file.
 * Prefix logs with the date
 * Errors are write in a file `kuzzle-error.log`
 * Warnings are write in a file `kuzzle-warning.log`
* We use the standard output
 * Prefix logs with the date
 * Info logs are displayed

## stdout

For this service `stdout`, this configuration is available:

| Name | Default value | Available | Description                 |
|------|---------------|-----------|-----------------------------|
| level | `error`   | in ascending order: `silly`, `verbose`, `info`, `debug`, `warn`, `error` | Debug level to apply. Messages with a lower level are not logged. |
| addDate | `true` | `true` / `false` | Define if you want to prefix your messages with the date. |

## file

For this service `file`, this configuration is available:

| Name | Default value | Available | Description                 |
|------|---------------|-----------|-----------------------------|
| outputs | `null` | / | `outputs` is an object listing where to write each logs levels |
| addDate | `true` | `true` / `false` | Define if you want to prefix your messages with the date. |


The attribute `outputs` contains an entry for each strategies that we want define. Each definitions contain:

| Name | Default value | Available | Description                 |
|------|---------------|-----------|-----------------------------|
| level | `error`   | in ascending order: `silly`, `verbose`, `info`, `debug`, `warn`, `error` | Debug level to apply. Messages with a lower level are not logged. |
| filename | `null` | / | The path where the log will be saved. |

# How to create a plugin

See [Kuzzle documentation](https://github.com/kuzzleio/kuzzle/blob/develop/docs/plugins.md) about plugin for more information about how to create your own plugin.

# About Kuzzle

For UI and linked objects developers, [Kuzzle](https://github.com/kuzzleio/kuzzle) is an open-source solution that handles all the data management
(CRUD, real-time storage, search, high-level features, etc).

[Kuzzle](https://github.com/kuzzleio/kuzzle) features are accessible through a secured API. It can be used through a large choice of protocols such as REST, Websocket or Message Queuing protocols.