var
  rewire = require('rewire'),
  sinon = require('sinon'),
  should = require('should'),
  serviceFile = rewire('../../lib/services/file');

describe('services/file', function () {
  var
    log = function () {
    },
    winstonMock,
    reset;

  beforeEach(() => {
    reset = serviceFile.__set__({
      winston: {
        Logger: sinon.spy(),
        transports: {
          File: sinon.stub().returnsArg(0)
        }
      }
    });
    winstonMock = serviceFile.__get__('winston');
  });

  afterEach(() => {
    reset();
  });

  it('should set default values if not provided', () => {
    var transportArgs;

    serviceFile.init({}, log);

    should(serviceFile.addDate).be.false();
    should(serviceFile.dateFormat).be.undefined();
    should(serviceFile.log).be.eql(log.bind(serviceFile));
    should(winstonMock.Logger).be.calledOnce();
    should(winstonMock.transports.File).be.calledOnce();

    transportArgs = winstonMock.transports.File.firstCall.returnValue;
    should(transportArgs).match({
      json: false,
      level: 'error',
      filename: 'kuzzle.log'
    });
    should(transportArgs.formatter).be.a.Function();
  });

  it('should set the given options', () => {
    var transportArgs;

    serviceFile.init({level: 'debug', filename: 'test', addDate: 'addDate', dateFormat: 'dtTest'}, log);

    should(serviceFile.addDate).be.false();
    should(serviceFile.dateFormat).be.undefined();
    should(serviceFile.log).be.eql(log.bind(serviceFile));
    should(winstonMock.Logger).be.calledOnce();
    should(winstonMock.transports.File).be.calledOnce();

    transportArgs = winstonMock.transports.File.firstCall.returnValue;
    should(transportArgs).match({
      json: false,
      level: 'debug',
      filename: 'test'
    });
    should(transportArgs.formatter).be.a.Function();
  });

});
