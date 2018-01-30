const querystring = require('querystring');
const { URL } = require('url');

function setUrlParams(clientId = '', redirectURI = '') {
  const params = {
    'client_id': clientId,
    'redirect_uri': redirectURI,
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
  return {
    method: 'POST',
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
