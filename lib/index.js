const { URL } = require('url');

const { getAccessToken, getAuthentication } = require('./request');
const { setCredentials, setUrlParams, setOptions } = require('./builder');

const server = '';

const urlParams = setUrlParams('', '');
const credentials = setCredentials('', '');

const authentication = new URL(`/as/authorization.oauth2?${urlParams}`, server);

console.log = function () {
  const args = Array.from(arguments);

  args.forEach((arg) => {
    console.dir(arg, { colors: true, depth: 500, showHidden: true });
  })
}

getAuthentication(authentication.href)
  .then(({ cookie, action }) => {
    const url = new URL(action, server);
    const options = setOptions(url, cookie);
    return getAccessToken(options, credentials);
  })
  .then((accessToken) => console.log(accessToken));