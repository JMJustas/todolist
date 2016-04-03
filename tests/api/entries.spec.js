'use strict';
require('should');
const _ = require('lodash');
const supertest = require('supertest');
const status = require('http-status');

const config = require('./config.json');
const api = require('../../src/server')(config);
const DbUtils = require('./dbUtils');

const db = new DbUtils(config);

const client = supertest.agent(`http://${config.host}:${config.port}`);

const testData = [
  {
    id: '1',
    title: 'todo1',
    completed: false
  },
  {
    id: '2',
    title: 'todo2',
    completed: true
  }
];

describe('Integration tests for Entries endpoint', () => {

  let httpServer = null;
  before((done) => {
    httpServer = api.listen(done);
  });

  after(() => {
    httpServer.close();
  });

  beforeEach((done) => {
    db.populateTable('entries', testData, done);
  });

  afterEach((done) => {
    db.truncateTable('entries', done) ;
  });

  it('should be able to load all existing entries', (done) => {
    client
      .get('/entries')
      .expect(status.OK)
      .expect('Content-type', 'application/json; charset=utf-8')
      .end(verify);

    function verify(err, response) {
      if (err)
        return done(err);
      response.body.should.eql(testData);
      done(err);
    }
  });

  it('should be able to load one entry by id', (done) => {
    const entry = testData[0];
    return assertEntry(entry, done);
  });

  it('should be able to create a new entry', (done) => {
    const newEntry = {
      title: 'newEntry'
    };

    client
      .post('/entries')
      .send(newEntry)
      .expect(status.CREATED)
      .expect('Content-type', 'application/json; charset=utf-8')
      .end(verify);

    function verify(err, response) {
      if (err)
        return done(err);

      const result = response.body;
      Boolean(result.id).should.equal(true);
      result.completed.should.equal(false);
      result.title.should.equal(newEntry.title);
      return assertEntry(result, done);
    }
  });

  it('should be able to mark entry as completed', (done) => {
    const entry = _.assign({}, testData[0], {completed: true});
    client
      .put(`/entries/${entry.id}`)
      .send(entry)
      .expect(status.OK)
      .expect('Content-type', 'application/json; charset=utf-8')
      .end(verify);

    function verify(err, response) {
      if (err)
        return done(err);
      response.body.should.eql(entry);
      return assertEntry(entry, done);
    }
  });

  it('should be able to delete single entry', (done) => {
    const entry = testData[0];
    client
      .delete(`/entries/${entry.id}`)
      .expect(status.NO_CONTENT)
      .end(verify);

    function verify(err) {
      if (err)
        return done(err);

      return client
        .get(`/entries/${entry.id}`)
        .expect(status.NOT_FOUND)
        .end(done);
    }
  });

  /**
   * Makes request to API to retrieve entry by id (to ensure that resource
   * is accessible) and asserts if result matches original data.
   * @param {Object}    entry     entry to check
   * @param {Function}  done      Asynchronous callback
   *
   * @return {*} nothing
   */
  function assertEntry(entry, done) {
    Boolean(entry.id).should.equal(true);
    return client
      .get(`/entries/${entry.id}`)
      .expect(status.OK)
      .expect('Content-type', 'application/json; charset=utf-8')
      .end((err, response) => {
        if (err)
          return done(err);
        response.body.should.eql(entry);
        return done();
      });
  }
});
