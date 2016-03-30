'use strict';

const EntryModel = require('./entryModel');

class Models {
  constructor() {}

  register(knex) {
    this.knex = knex;
    this.entries = new EntryModel(knex);
    return this;
  }
}

module.exports = new Models();
