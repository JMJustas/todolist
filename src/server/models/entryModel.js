'use strict';
const Model = require('./baseModel');
/**
 * Adds Entry-specific database row decoding
 */
class EntryModel extends Model {

  constructor(qb) {
    super(qb, 'entries');
  }

  find(criteria, cb) {
    return super.find(criteria,
      (err, rows) => {
        if (err)
          return cb(err);

        rows = rows.map(EntryModel.decodeRow);
        return cb(null, rows);
      });
  }

  /**
   * Decodes db row to Entry instance
   * @param row
   */
  static decodeRow(row) {
    row.completed = Boolean(row.completed);
    return row;
  }

}

module.exports = EntryModel;
