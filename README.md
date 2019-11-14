<p align="center">
  <img src="https://user-images.githubusercontent.com/7868838/66318648-01cbcb80-e91c-11e9-8b83-d3eb6f29ddf9.png"/>
</p>
<p align="center">
  <a href="https://david-dm.org/kuzzleio/kuzzle-plugin-logger">
    <img src="https://david-dm.org/kuzzleio/kuzzle-plugin-logger.svg" />
  </a>
  <a href="https://travis-ci.com/kuzzleio/kuzzle-plugin-logger">
    <img alt="undefined" src="https://travis-ci.com/kuzzleio/kuzzle-plugin-logger.svg?branch=master">
  </a>
  <a href="https://github.com/kuzzleio/kuzzle-plugin-logger/blob/master/LICENSE">
    <img alt="undefined" src="https://img.shields.io/github/license/kuzzleio/kuzzle-plugin-logger.svg?style=flat">
  </a>
</p>

## About

### Kuzzle Logger Plugin

This plugin is a bridge between Kuzzle and the [winston](https://www.npmjs.com/package/winston) package.
It is part of the default plugins provided with Kuzzle.

Currently, three winston transports are supported:

* `stdout` (winston `Console`)
* `file` (winston `File`)
* `syslog` (from [winston-syslog](https://www.npmjs.com/package/winston-syslog))

### Kuzzle

Kuzzle is a ready-to-use, **on-premises and scalable backend** that enables you to manage your persistent data and be notified in real-time on whatever happens to it. 
It also provides you with a flexible and powerful user-management system.

* :watch: __[Kuzzle in 5 minutes](https://kuzzle.io/company/about-us/kuzzle-in-5-minutes/)__
* :octocat: __[Github](https://github.com/kuzzleio/kuzzle)__
* :earth_africa: __[Website](https://kuzzle.io)__
* :books: __[Documentation](https://docs.kuzzle.io)__
* :email: __[Gitter](https://gitter.im/kuzzleio/kuzzle)__

### How to create a plugin

Please refer to [Kuzzle plugin development documentation](https://docs.kuzzle.io/core/2/plugins/essentials/introduction) for more information on how to build you own plugins.

### Get trained by the creators of Kuzzle :zap:

Train yourself and your teams to use Kuzzle to maximize its potential and accelerate the development of your projects.  
Our teams will be able to meet your needs in terms of expertise and multi-technology support for IoT, mobile/web, backend/frontend, devops.  
:point_right: [Get a quote](https://hubs.ly/H0jkfJ_0)

### Compatibility matrix

| Kuzzle Version | Plugin Version |
| -------------- | -------------- |
| 1.8.x          | 2.x.x          | 
| 2.x.x          | 3.x.x          |

## Configuration

Each transport can be added and configured by adding it to the `services` entry.

The content of this section is _almost_ passed as-is to `winston` related transport constructor.

The only exception is `addDate` and `dateFormat` parameters, which are specific to Kuzzle and allow to specify a custom 
date format using only plain-text configuration, using [moment format](http://momentjs.com/docs/#/displaying/format/).

:warning: **Contrary to winston, it is not possible to pass a function to any option.**

Sample:

```json
{
  "threads": 2,
  "services": {
    "file": {
      "level": "warn",
      "filename": "kuzzle.log",
      "addDate": true,
      "dateFormat": "dddd, MMMM Do YYYY, h:mm:ss a"
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

### Default configuration

If no configuration is given, this plugin will output logs to the console only, from `info` level and above.

### Transports configuration references

* [stdout](https://github.com/winstonjs/winston/blob/master/docs/transports.md#console-transport)
* [file](https://github.com/winstonjs/winston/blob/master/docs/transports.md#file-transport)
* [syslog](https://github.com/winstonjs/winston-syslog)

### Date formatting

Native `winston` date related/timestamp configurations are merged during the plugin init for transports that support it.

In other words, `timestamp` and `addDate` can be used indifferently for `stdout` and `file` transports: 

```json
{
  "services": {
    "stdout": {
      "timestamp": true,
      "dateFormat": "YYYY-MM-DD HH-mm-ss"
    }
  }
}
```
