var
  rewire = require('rewire'),
  sinon = require('sinon'),
  should = require('should'),
  service = rewire('../../lib/services/syslog');

describe('services/syslog', () => {
  var
    log = function () {},
    winstonMock,
    reset;

  beforeEach(() => {
    reset = service.__set__({
      winston: {
        config: {
          syslog: {
            levels: 'levels'
          }
        },
        Logger: sinon.spy(),
        setLevels: sinon.spy(),
        transports: {
          Syslog: sinon.spy()
        }
      }
    });
    winstonMock = service.__get__('winston');
  });

  afterEach(() => {
    reset();
  });

  it('should use syslog levels', () => {
    service.init({}, log);

    should(winstonMock.setLevels).be.calledOnce();
    should(winstonMock.setLevels).be.calledWithExactly(winstonMock.config.syslog.levels);
  });

  it('should set the default values if none are provided', () => {
    service.init({}, log);

    should(service.addDate).be.true();
    should(service.dateFormat).be.undefined();
    should(service.log).be.eql(log.bind(service));
    should(winstonMock.Logger).be.calledOnce();
    should(winstonMock.transports.Syslog).be.calledOnce();
    should(winstonMock.transports.Syslog).be.calledWith({
      level: 'error'
    });
  });

  it('should set the given parameters', () => {
    service.init({
      level: 'debug',
      addDate: 'addDate',
      dateFormat: 'dateFormat',
      host: 'host',
      port: 'port',
      protocol: 'protocol',
      path: 'path',
      pid: 'pid',
      facility: 'facility',
      localhost: 'localhost',
      type: 'type',
      app_name: 'app_name',
      eol: 'eol'
    }, log);

    should(service.addDate).be.exactly('addDate');
    should(service.dateFormat).be.exactly('dateFormat');
    should(service.log).be.eql(log.bind(service));
    should(winstonMock.Logger).be.calledOnce();
    should(winstonMock.transports.Syslog).be.calledOnce();
    should(winstonMock.transports.Syslog).be.calledWith({
      level: 'debug',
      host: 'host',
      port: 'port',
      protocol: 'protocol',
      path: 'path',
      pid: 'pid',
      facility: 'facility',
      localhost: 'localhost',
      type: 'type',
      app_name: 'app_name',
      eol: 'eol'
    });

  });


});
