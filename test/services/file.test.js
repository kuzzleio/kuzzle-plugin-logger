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

const mock = require('mock-require');
const sinon = require('sinon');
const should = require('should');

const Service = require('../../lib/services/service');


describe('services/file', function () {
  let ServiceFile;
  let serviceFile;
  let winstonMock;
  let fsMock;

  beforeEach(() => {
    fsMock = {
      existsSync: sinon.stub().returns(false),
      accessSync: sinon.stub(),
      W_OK: 2,
      R_OK: 4,
    };

    winstonMock = {
      createLogger: sinon.spy(),
      transports: {
        File: sinon.stub().returnsArg(0)
      }
    };

    mock('winston', winstonMock);
    mock('fs', fsMock);

    ServiceFile = mock.reRequire('../../lib/services/file');
  });

  after(() => {
    mock.stopAll();
  });

  describe('#constructor', () => {
    it('should be an instance of Service', () => {
      serviceFile = new ServiceFile({});
      should(serviceFile).be.an.instanceof(Service);
    });

    it('should set default values if not provided', () => {
      let transportArgs;

      serviceFile = new ServiceFile({});

      should(serviceFile.addDate).be.null();
      should(serviceFile.dateFormat).be.undefined();
      should(winstonMock.createLogger).be.calledOnce();
      should(winstonMock.transports.File).be.calledOnce();

      transportArgs = winstonMock.transports.File.firstCall.returnValue;
      should(transportArgs).match({
        level: 'error',
        filename: 'kuzzle.log'
      });
    });

    it('should set the given options', () => {
      let transportArgs;

      serviceFile = new ServiceFile({
        json: false,
        level: 'debug',
        addDate: 'addDate',
        dateFormat: 'dtTest'
      });

      should(serviceFile.addDate).be.true();
      should(serviceFile.dateFormat).be.eql('dtTest');
      should(winstonMock.createLogger).be.calledOnce();
      should(winstonMock.transports.File).be.calledOnce();

      transportArgs = winstonMock.transports.File.firstCall.returnValue;
      should(transportArgs).match({
        json: false,
        level: 'debug',
        filename: 'kuzzle.log'
      });
    });

    it('should check access rights if the file exists', () => {
      fsMock.existsSync.returns(true);

      serviceFile = new ServiceFile({ filename: 'çanakkale.tr' });

      should(fsMock.accessSync)
        .be.calledWith('çanakkale.tr', fsMock.W_OK | fsMock.R_OK);
    });
  });
});
