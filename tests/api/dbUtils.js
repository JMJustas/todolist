/**
* Helper methods for db population
**/

'use strict';
const knex = require('knex');
const Promise = require('bluebird');

class DbUtils {
  constructor(config) {
    this.knex = knex({
      client: 'mysql',
      connection: config.db
    });
  }

  /**
   * inserts one or multiple entries to specified table
   * @param {String}            table   table name.
   * @param {Object|[Object]}   entries entries to insert. Array of values
   * mapped by names
   *
   * @param {Function}          cb      callback after all entries are inserted.
   *
   * @return {*} nothing
   */
  populateTable(table, entries, cb) {
    if (!table || !table.length)
      throw new Error ('Invalid table name!');

    if (!entries)
      throw new Error('No entries provided');
    if (!(entries instanceof Array))
      entries = [entries];

    const inserts = entries.map((entry) => {
      return this.knex.insert(entry).into(table);
    });

    return Promise.all(inserts).asCallback(cb);
  }

  /**
   * Truncates specified table
   * @param {String}    table   name of the table
   * @param {Function}  cb      callback function
   * @return {*}    nothing
   */
  truncateTable(table, cb) {
    if (!table || !table.length)
      throw new Error ('Invalid table name!');

    return this.knex(table).truncate().asCallback(cb);
  }

}

module.exports = DbUtils;
