
const { checkConnection, getAuthentication, getConfiguration, getInformation } = require('./request');
const { setCredentials, setUrlParams, setOptions } = require('./builder');
const { parseUrl } = require('./helpers');

module.exports = ({ issuer, client, redirect, scope, username, password, id_token }) => {
  return checkConnection(issuer)
    .then(() => getConfiguration(issuer))
    .then(({ authorization_endpoint: endpoint }) => {

      const params = setUrlParams(client, redirect, scope);
      const url = parseUrl(`${endpoint}?${params}`);

      return getAuthentication(url);
    })
    .then(({ action, cookies }) => {
      const url = parseUrl(action, issuer);
      const options = setOptions(url, cookies);
      const credentials = setCredentials(username, password);

      return getInformation(options, credentials, id_token);
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
