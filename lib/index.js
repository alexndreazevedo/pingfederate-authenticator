
const { checkConnection, getAccessToken, getAuthentication, getConfiguration } = require('./request');
const { setCredentials, setUrlParams, setOptions } = require('./builder');
const { parseUrl } = require('./helpers');

module.exports = ({ issuer, client, redirect, username, password }) => {
  return checkConnection(issuer)
    .then(() => getConfiguration(issuer))
    .then(({ authorization_endpoint: endpoint }) => {

      const params = setUrlParams(client, redirect);
      const url = parseUrl(`${endpoint}?${params}`);

      return getAuthentication(url);
    })
    .then(({ action, cookies }) => {
      const url = parseUrl(action, issuer);
      const options = setOptions(url, cookies);
      const credentials = setCredentials(username, password);

      return getAccessToken(options, credentials);
    })
    .then((accessToken) => {
      if (accessToken) {
        process.stdout.write(accessToken);
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
