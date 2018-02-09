const commander = require('commander');

module.exports = (args) => {
  return commander
    .description('PingFederate Authenticator')
    .usage('--issuer <uri> --client <id> --redirect <uri> --username <user> --password <pass>')
    .option('-I, --issuer <uri>', 'Set the OpenID Issuer URI. Retrieve the OpenID configuration at <issuer>/.well-know/openid-configuration')
    .option('-C, --client <id>', 'Define the Client ID. It must be a client with activated implicit flow.')
    .option('-R, --redirect <uri>', 'Define the Redirect URI. It must to be an authorized redirection URI.')
    .option('-S, --scope <scope list>', 'Define the scopes list. Default is "openid profile".')
    .option('-U, --username <user>', 'Specify the username to login')
    .option('-P, --password <pass>', 'Specify the password to login')
    .parse(args);
};
