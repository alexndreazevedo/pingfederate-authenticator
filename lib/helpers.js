const { URL } = require('url');

const cheerio = require('cheerio');

function getActionFromForm(content = '') {
  const query = cheerio.load(content);
  return query('form').attr('action');
}

function parseHash(location = '') {
  try {
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
  } catch (e) {
    return {};
  }
}

module.exports = {
  getActionFromForm,
  parseHash
};
