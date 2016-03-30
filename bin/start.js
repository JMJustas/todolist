const config = require('../config.json');
const app = require('../src/server')(config);

app.listen((err) => {
  if (err)
    throw err;

  console.log(`\n${'TODO app webserver started!'}`);
  console.log(`Host:\t\t\t\t${config.host}`);
  console.log(`Port:\t\t\t\t${config.port}\n`);
});

