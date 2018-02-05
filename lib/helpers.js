const querystring = require('querystring');
const { URL } = require('url');

const cheerio = require('cheerio');

function getActionFromForm(content = '') {
  const query = cheerio.load(content);
  return query('form').attr('action');
}

function parseHash(location = '') {
  try {
    const url = new URL(location);
    return querystring.parse(url.hash.substring(1));

  } catch (e) {
    return {};
  }
}

function parseUrl(url, base) {
  if (url instanceof URL) {
    return url;
  }

  try {
    return new URL(url, base);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = {
  getActionFromForm,
  parseHash,
  parseUrl
};
