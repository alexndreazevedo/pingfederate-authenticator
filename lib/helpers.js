const { URL } = require('url');

const cookie = require('cookie');
const cheerio = require('cheerio');

function getActionFromForm(content = '') {
  const query = cheerio.load(content);
  return query('form').attr('action');
}

function parseCookie(cookies = '') {
  const label = 'PF';
  if (cookies instanceof Array) {
    [ cookies ] = cookies;
  }

  const { [ label ]: parsedCookie } = cookie.parse(cookies);

  return cookie.serialize(label, parsedCookie);
}

function parseHash(location = '') {
  const url = new URL(location);

  return url.hash
    .substring(1)
    .split('&')
    .reduce((accumulator, item) => {
      const [ key, value ] = item.split('=');

      return {
        ...accumulator,
        [ key ]: value
      }
    }, {});
}

module.exports = {
  getActionFromForm,
  parseCookie,
  parseHash
};
