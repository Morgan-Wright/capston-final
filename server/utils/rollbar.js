const { ROLLBAR_POST_SERVER_ACCESS_TOKEN }= process.env;
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: ROLLBAR_POST_SERVER_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
      code_version: '1.0.0',
  }
});

module.exports = rollbar;