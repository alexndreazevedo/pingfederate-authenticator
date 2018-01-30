const https = require('https');
const querystring = require('querystring');
const { URL } = require('url');

const cheerio = require('cheerio');

const server = '';

const params = querystring.stringify({
  client_id: '',
  grant_type: 'token',
  redirect_uri: '',
  response_type: 'token'
});

const body = querystring.stringify({
  'pf.username': '',
  'pf.pass': ''
});

const authentication = `${server}/as/authorization.oauth2?${params}`;

https.get(authentication, (res) => {
  const [ cookies ] = res.headers['set-cookie'];
  const [ cookie ] = (cookies || '').split(';') || [];

  let content = '';

  res.on('data', (data) => {
    content += data;
  });

  res.on('end', () => {
    const query = cheerio.load(content);
    const path = query('form').attr('action');
    const url = new URL(server);

    const options = {
      path,
      method: 'POST',
      hostname: url.hostname,
      port: url.port,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookie,
        'Host': url.host,
        'Origin': url.origin,
        'Referer': server
      }
    }

    const request = https.request(options, (res) => {
      const location = res.headers['location'];
      const returned = new URL(location);

      const obj = returned.hash.substring(1).split('&').reduce((acc, item) => {
        const [ key, value ] = item.split('=');

        return {
          ...acc,
          [key]: value
        }
      }, {});

      console.log(obj['access_token']);
    });

    request.write(body);
    request.end();
  });
});
