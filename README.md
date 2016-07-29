[![Build Status](https://travis-ci.org/kuzzleio/kuzzle-plugin-logger.svg?branch=master)](https://travis-ci.org/kuzzleio/kuzzle-plugin-logger)
![logo](http://kuzzle.io/images/logoS.png)

# Kuzzle logger plugin

This plugin is a bridge between Kuzzle and [winston](https://www.npmjs.com/package/winston) package.
It is part of the default plugins provided with Kuzzle.

Currently, three winston transports are supported:

* `stdout` (winston `Console`)
* `file` (winston `File`)
* `syslog` (from [winston-syslog](https://www.npmjs.com/package/winston-syslog))


## Manifest

This plugin doesn't need any right.

## Configuration

Sample:

```json
{
  "services": {
    "file": {
      "level": "warn",
      "filename": "kuzzle.log",
      "addDate": true
    },
    "stdout": {
      "level": "info",
      "addDate": "true"
    },
    "syslog": {
      "protocol": "unix",
      "path": "/dev/log",
      "facility": "local6"
    }
  }
}
```

## stdout

* **level**: maximal level to log (Default: `error`)
* **addDate** `true|false` if set to true, prefix all logs with the current date (default: `true`)
* **dateFormat**: A string in [moment format syntax](http://momentjs.com/docs/#/displaying/) used to format the prefixed date (Default: ISO8601: `YYYY-MM-DDTHH:mm:ssZ`).

## file

* **level**: maximal level to log (Default: `error`)
* **filename**: path of the log file (Default: `kuzzle.log`)
* **addDate** `true|false` if set to true, prefix all logs with the current date (default: `true`)
* **dateFormat**: A string in [moment format syntax](http://momentjs.com/docs/#/displaying/) used to format the prefixed date (Default: ISO8601: `YYYY-MM-DDTHH:mm:ssZ`).

## syslog

In addition to the `level`, `addDate`, ans `dateFormat` parameter, the syslog configuration takes the same parameters as [winston-syslog](https://github.com/winstonjs/winston-syslog) module ones.

# How to create a plugin

Please refer to [Kuzzle plugin documentation](http://kuzzle.io/guide/#plugins) for more information on how to build you own plugins.

# About Kuzzle

Kuzzle is an open-source back-end solution for various applications. 

It combines a high level API, a database, a real-time engine, subscription and notification mechanisms as well as some advanced search features. The API is accessible through several standard protocols. 

http://kuzzle.io
