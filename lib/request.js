const https = require('https');

const { setOptions } = require('./builder');
const { getActionFromForm, parseHash } = require('./helpers');

/**
 * Retrieves the access token from the redirection
 *
 * @param {any} url
 * @param {any} cookies
 * @param {any} body
 * @returns {string} access_token
 */
function getAccessToken(options, body) {
  const label = 'access_token';

  return new Promise((resolve, reject) => {
    const callback = (response) => {
      const { location } = response.headers;
      const hash = parseHash(location);

      response.on('error', (err) => reject(err));

      resolve(hash[ label ]);
    };

    const request = https.request(options, callback);
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

  const label = 'set-cookie';
  let content = '';

  return new Promise((resolve, reject) => {

    const callback = (response) => {
      const { [ label ]: cookies } = response.headers || {};

      response.on('data', (data) => content += data);
      response.on('error', (err) => reject(err));

      response.on('end', () => resolve({
        cookies,
        action: getActionFromForm(content)
      }));
    }

    https.get(url, callback);
  });
}

function getConfiguration() {

}

module.exports = {
  getAccessToken,
  getAuthentication,
  getConfiguration
};
