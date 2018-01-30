const { URL } = require('url');

const { getAccessToken, getAuthentication, getConfiguration } = require('./request');
const { setCredentials, setUrlParams, setOptions } = require('./builder');

const issuer = '';

const urlParams = setUrlParams('', '');
const credentials = setCredentials('', '');

const authentication = new URL(`/as/authorization.oauth2?${urlParams}`, issuer);

// @TODO: implement the getConfiguration to retrieve endpoints from /.well-known/openid-configuration
// @TODO: Command line implementation with minimist
// @TODO: exports into a Promise as a module

getAuthentication(authentication.href)
  .then(({ cookies, action }) => {
    const url = new URL(action, issuer);
    const options = setOptions(url, cookies);

    return getAccessToken(options, credentials);
  })
  .then((accessToken) => console.log(accessToken));
