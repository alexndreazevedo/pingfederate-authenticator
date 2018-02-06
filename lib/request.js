const { setOptions } = require('./builder');
const { getActionFromForm, parseHash, parseUrl } = require('./helpers');

function setConnector(url) {
  return url.protocol && url.protocol === 'https:'
    ? require('https')
    : require('http');
}

/**
 * Checks connection with the issuer address
 *
 * @param {any} issuer
 * @returns
 */
function checkConnection(url) {
  url = parseUrl(url);

  return new Promise((resolve, reject) => {
    const callback = (err) => err
      ? reject('Could not find the address. Please check the issuer.')
      : resolve();

    require('dns').lookup(url.hostname, callback);
  });
}

/**
 * Retrieves the access token from the redirection
 *
 * @param {any} url
 * @param {any} cookies
 * @param {any} body
 * @returns {string} access_token
 */
function getAccessToken(options, body) {
  const connector = setConnector(options);
  const label = 'access_token';

  return new Promise((resolve, reject) => {
    const callback = (response) => {
      const { location } = response.headers;
      const hash = parseHash(location);

      response.on('error', (err) => reject(err));

      resolve(hash[ label ]);
    };

    const request = connector.request(options, callback);
    request.write(body);
    request.end();
  });
}

/**
 * Performs the first round of authentication
 *
 * @param {any} url
 * @returns { cookies, action }
 */
function getAuthentication(url) {
  const connector = setConnector(url);

  const label = 'set-cookie';
  let content = '';

  return new Promise((resolve, reject) => {

    const callback = (response) => {
      const { [ label ]: cookies } = response.headers || {};

      response.on('data', (data) => content += data);
      response.on('error', (err) => reject(err));

      response.on('end', () => resolve({
        cookies,
        action: getActionFromForm(content) || ''
      }));
    };

    connector.get(url, callback);
  });
}

function getConfiguration(issuer) {
  const url = parseUrl('.well-known/openid-configuration', issuer);
  const connector = setConnector(url);

  let content = '';

  return new Promise((resolve, reject) => {

    const callback = (response) => {
      response.on('data', (data) => content += data);
      response.on('error', (err) => reject(err));

      response.on('end', () => {
        try {
          const json = JSON.parse(content);
          resolve(json);
        } catch (e) {
          console.error('Invalid OpenID configuration file. Please check the issuer.');
          process.exit(1);
        }
      });
    };

    connector.get(url, callback);
  });
}

module.exports = {
  checkConnection,
  getAccessToken,
  getAuthentication,
  getConfiguration
};
