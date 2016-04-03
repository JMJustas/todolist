/*eslint-disable no-sync*/
/*eslint-disable no-console*/

const fs = require('fs');
const program = require('commander');

program
  .description('Starts TODO app server')
  .version('1.0.0')
  .option('--config-file [filePath]', 'File with all configuration')
  .parse(process.argv);


const configFile = program.configFile || '../config.json';
const config = JSON.parse(fs.readFileSync(configFile, {encoding: 'utf8'}));
const app = require('../src/server')(config);

app.listen((err) => {
  if (err)
    throw err;

  console.log(`\n${'TODO app webserver started!'}`);
  console.log(`Host:\t\t\t\t${config.host}`);
  console.log(`Port:\t\t\t\t${config.port}\n`);
});

