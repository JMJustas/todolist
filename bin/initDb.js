'use strict';
/**
 * Initializes a schema from given config file.
 */

/*eslint-disable no-sync*/
/*eslint-disable no-console*/

const fs = require('fs');
const mysql = require('mysql');
const program = require('commander');

const SCHEMA_SQL = 'schema.sql';
program
  .description('Creates a db schema for a todoapp')
  .version('1.0.0')
  .option('--config-file [filePath]', 'File with all configuration')
  .parse(process.argv);


const config = JSON.parse(
  fs.readFileSync(program.configFile, {encoding: 'utf8'})
).db;
config.multipleStatements = true;
const databaseName = config.database;
delete config.database;

const db = mysql.createConnection(config);
const sql =
  `
    CREATE DATABASE IF NOT EXISTS ${databaseName};
    USE ${databaseName};
    ${fs.readFileSync(SCHEMA_SQL, {encoding: 'utf8'})}
  `;


db.query(sql,
  (err) => {
    if (err)
      throw err;
    console.log('SCHEMA INITIALIZED SUCCESSFULLY!');
    process.exit(0);
  });

