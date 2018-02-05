
const { checkConnection, getAccessToken, getAuthentication, getConfiguration } = require('./request');
const { setCredentials, setUrlParams, setOptions } = require('./builder');
const { parseUrl } = require('./helpers');

// @TODO: parse hash with querystring module

module.exports = ({ issuer, client, redirect, username, password }) => {
  return checkConnection(issuer)
    .then(() => getConfiguration(issuer))
    .then((configuration) => {
      const authorization = configuration[ 'authorization_endpoint' ];
      const params = setUrlParams(client, redirect);

      return getAuthentication(`${authorization}?${params}`);
    })
    .then(({ action, cookies }) => {
      const url = parseUrl(action, issuer);
      const options = setOptions(url, cookies);
      const credentials = setCredentials(username, password);

      return getAccessToken(options, credentials);
    })
    .then((accessToken) => {
      if (accessToken) {
        // Avoid pipe blocking on Windows: https://github.com/nodejs/node/issues/11514
        if (process.stdout._handle) {
          process.stdout._handle.setBlocking(false);
        }

        if (process.stdout.isTTY) {
          process.stdout.write(accessToken);
        }
        process.exit(0);
      }

      console.error('The access token could not be issued. Please check your credentials.');
      process.exit(1);
    })
    .catch((err) => {
      console.error('An error occurred', err);
      process.exit(1);
    });
};
