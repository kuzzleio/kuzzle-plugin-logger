var
  rewire = require('rewire'),
  sinon = require('sinon'),
  should = require('should'),
  serviceStdout = rewire('../../lib/services/stdout');

describe('services/stdout', function () {
  var
    log = function () {},
    winstonMock,
    reset;

  beforeEach(() => {
    reset = serviceStdout.__set__({
      winston: {
        Logger: sinon.spy(),
        transports: {
          Console: sinon.spy()
        }
      }
    });
    winstonMock = serviceStdout.__get__('winston');
  });

  afterEach(() => {
    reset();
  });

  it('should set the default values if none are provided', () => {
    serviceStdout.init({}, log);

    should(serviceStdout.addDate).be.true();
    should(serviceStdout.dateFormat).be.undefined();
    should(serviceStdout.log).be.eql(log.bind(serviceStdout));
    should(winstonMock.Logger).be.calledOnce();
    should(winstonMock.transports.Console).be.calledOnce();
    should(winstonMock.transports.Console).be.calledWith({
      level: 'error'
    });
  });

  it('should use the given parameters', () => {
    serviceStdout.init({level: 'debug', addDate: 'addDate', dateFormat: 'dateFormat'}, log);

    should(serviceStdout.addDate).be.exactly('addDate');
    should(serviceStdout.dateFormat).be.exactly('dateFormat');
    should(serviceStdout.log).be.eql(log.bind(serviceStdout));
    should(winstonMock.Logger).be.calledOnce();
    should(winstonMock.transports.Console).be.calledOnce();
    should(winstonMock.transports.Console).be.calledWith({
      level: 'debug'
    });

  });

});
