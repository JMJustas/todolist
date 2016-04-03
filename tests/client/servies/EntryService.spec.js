'use strict';

require('should');
const Promise = require('es6-promise').Promise;
const axios = require('axios');

const EntryService =
  require('../../../src/client/js/services/EntryService').default;

describe('Tests for EntryService', () => {
  it('should be able to register listeners', () => {
    const listener = sinon.spy();
    const service = new EntryService();
    service.register(listener);

    service.dataUpdated();

    service.listenerCount('dataUpdated').should.equal(1);
    listener.called.should.equal(true);
  });

  it('should be able to unregister listeners', () => {
    const listener = sinon.spy();
    const service = new EntryService();

    service.register(listener);
    service.unregister(listener);

    service.listenerCount('dataUpdated').should.equal(0);
  });

  it('should load entries', (done) => {
    const data = [{id: 'id', title: 'testTitle', completed: false}];
    const backendRequest = sinon.stub(axios, 'get');
    backendRequest.returns(Promise.resolve({data}));

    const service = new EntryService();
    service.register(verify);
    service.load();

    function verify() {
      backendRequest.getCall(0).args[0]
        .should.equal('/entries?completed=false');
      service.data.should.equal(data);
      done();
    }
  });

  it('should create a new todo entry', (done) => {

    const title = 'testTitle';
    const data = {id: 'id', title, completed: false};
    const backendRequest = sinon.stub(axios, 'post');
    backendRequest.returns(Promise.resolve({data}));

    const service = new EntryService();

    service.register(verify);
    service.create(title);

    function verify() {
      backendRequest.called.should.equal(true);
      backendRequest.getCall(0).args[0]
        .should.equal('/entries');
      backendRequest.getCall(0).args[1]
        .should.eql({title});
      service.data.should.eql([data]);
      done();
    }
  });

  it('should complete an entry', (done) => {
    const service = new EntryService();
    const id = 'id';
    service.data = [{id, title: 'test', completed: false}];


    const backendRequest = sinon.stub(axios, 'put');
    backendRequest.returns(
      Promise.resolve({data: {id, title: 'test', completed: true}})
    );

    service.register(verify);
    service.complete(id);

    function verify() {
      backendRequest.called.should.equal(true);
      var request = backendRequest.getCall(0);
      request.args[0].should.equal(`/entries/${id}`);
      request.args[1].should.eql({id, title: 'test', completed: true});
      service.data[0].completed.should.equal(true);
      done();
    }
  });


});
