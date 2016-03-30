'use strict';
const Model = require('./baseModel');
/**
 * Adds Entry-specific database row decoding
 */
class EntryModel extends Model {

  constructor(qb) {
    super(qb, 'entries');
  }

  /**
   * Decodes db row to Entry instance
   * @param row
   */
  decodeRow(row) {
    row = super.decodeRow(row);
    row.completed = Boolean(row.completed);
    return row;
  }

}

module.exports = EntryModel;
