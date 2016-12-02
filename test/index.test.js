var
  rewire = require('rewire'),
  should = require('should'),
  sinon = require('sinon'),
  Plugin = rewire('../lib'),
  hooks = require('../lib/config/hooks');

describe('index', () => {
  var
    plugin;

  beforeEach(() => {
    plugin = new Plugin();
  });

  describe('#constructor', () => {
    it('should implement all methods listed in hooks', () => {
      Object.keys(hooks).forEach(k => {
        should(plugin[hooks[k]]).be.a.Function();
      });
    });

    it('all hook methods should return false if dummy', () => {
      plugin.isDummy = true;

      Object.keys(hooks).forEach(k => {
        should(plugin[hooks[k]]()).be.false();
      });
    });

    it('all hook methods should call the loggers', () => {
      Object.keys(hooks).forEach(k => {
        plugin = new Plugin();

        plugin.loggers = [
          { log: sinon.spy() },
          { log: sinon.spy() }
        ];

        plugin[hooks[k]]('message', 'event');

        plugin.loggers.forEach(logger => {
          should(logger.log).be.calledOnce();
          should(logger.log).be.calledWith(k.replace(/^log:/, ''), 'event', 'message');
        });
      });
    });

  });

  describe('#init', () => {

    it('should throw if no config is given', () => {
      return should(() => plugin.init()).throw('plugin-logger: A configuration is required for plugin logger');
    });

    it('should throw if no services are configured', () => {
      return should(() => plugin.init({})).throw('plugin-logger: The \'services\' attribute, with services configurations to use is required');
    });

    it('should return the plugin if no error occurred', () => {
      var response = plugin.init({services: {}});

      should(response).be.an.instanceOf(Plugin);
    });

    it('should init the services', () => {
      var
        log = Plugin.__get__('log'),
        initSpy = sinon.spy();

      Plugin.__with__({
        require: () => () => {
          return {
            init: initSpy
          };
        }
      })(() => {
        plugin.init({
          services: {
            test: {
              foo: 'bar'
            }
          }
        });

        should(initSpy).be.calledOnce();
        should(initSpy).be.calledWith({foo: 'bar'}, log);
      });
    });

  });

  describe('#log', () => {
    var
      context,
      log = Plugin.__get__('log');

    beforeEach(() => {
      context = {
        addDate: true,
        winston: {
          log: sinon.spy()
        }
      };
    });

    it('should prefix the log with some date if addDate is truthy', () => {
      log.call(context, 'level', 'event', 'message');

      should(context.winston.log).be.calledOnce();
      should(context.winston.log.getCall(0).args[0]).be.exactly('level');
      should(context.winston.log.getCall(0).args[1]).match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2} \[EVENT\] message/);
    });

    it('should prefix the log with some date formatted as requested is addDate is truthy', () => {
      context.dateFormat = '____';

      log.call(context, 'level', 'event', 'message');

      should(context.winston.log).be.calledOnce();
      should(context.winston.log.getCall(0).args[0]).be.exactly('level');
      should(context.winston.log.getCall(0).args[1]).be.exactly('____ [EVENT] message');
    });

    it('should not prefix the log with some date if addDate is falsy', () => {
      context.addDate = false;

      log.call(context, 'level', 'event', 'message');

      should(context.winston.log).be.calledOnce();
      should(context.winston.log.getCall(0).args[0]).be.exactly('level');
      should(context.winston.log.getCall(0).args[1]).be.exactly('[EVENT] message');
    });
  });

});
