const querystring = require('querystring');

const { parseUrl } = require('./helpers');
/**
 * Create URL Params
 *
 * @param {string} [clientId='']
 * @param {string} [redirectURI='']
 * @param {string} [scope='openid profile']
 * @returns
 */
function setUrlParams(clientId = '', redirectURI = '', scope = 'openid profile') {
  const nonce = createNonce();
  const params = {
    'client_id': clientId,
    'redirect_uri': redirectURI,
    'scope': scope,
    'response_type': 'id_token token',
    'nonce': nonce
  };

  return querystring.stringify(params);
}

function createNonce() {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 40; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function setCredentials(username = '', password = '') {
  const body = {
    'pf.username': username,
    'pf.pass': password
  };

  return querystring.stringify(body);
}

function setOptions(url, cookies) {
  url = parseUrl(url);

  return {
    method: 'POST',
    protocol: url.protocol,
    hostname: url.hostname,
    port: url.port,
    path: url.path || url.pathname,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': cookies,
      'Host': url.host,
      'Origin': url.origin,
      'Referer': url.origin
    }
  };
}

module.exports = {
  setCredentials,
  setUrlParams,
  setOptions
};
