var context = require.context('./tests/client', true, /\.spec\.js$/);
context.keys().forEach(context);
