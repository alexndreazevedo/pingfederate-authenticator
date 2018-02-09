const querystring = require('querystring');

const { parseUrl } = require('./helpers');

function setUrlParams(clientId = '', redirectURI = '', scope = 'openid profile') {
  const params = {
    'client_id': clientId,
    'redirect_uri': redirectURI,
    'scope': scope,
    'grant_type': 'token',
    'response_type': 'token'
  };

  return querystring.stringify(params);
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
