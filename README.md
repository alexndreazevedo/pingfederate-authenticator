# PingFederate Authenticator
PingFederate authentication tool for automated issuance of Access Token using exclusively the Implicit Flow.

Installation
------------

```bash
$ npm -g install pf-authenticator
```

**NOTE:** Make sure you have Node.js and Npm installed in your machine ([https://nodejs.org/en/download](https://nodejs.org/en/download)).

Usage
-----

```bash
$ authenticator

  Usage: authenticator --issuer <uri> --client <id> --redirect <uri> --username <user> --password <pass>

  PingFederate Authenticator


  Options:

    -I, --issuer <uri>        Set the OpenID Issuer URI. Retrieve the OpenID configuration at <issuer>/.well-know/openid-configuration
    -C, --client <id>         Define the Client ID. It must be a client with activated implicit flow.
    -R, --redirect <uri>      Define the Redirect URI. It must to be an authorized redirection URI.
    -S, --scope <scope list>  Define the scopes list. Default is "openid profile".
    -i, --id_token            Retrieve the ID Token instead of Access Token.
    -U, --username <user>     Specify the username to login
    -P, --password <pass>     Specify the password to login
    -h, --help                output usage information
```

Additional information
----------------------

For scripting automation purposes, the token might be redirected to a file:
```bash
$ authenticator -I https://pfinstance.com:5555 -C my_client_app -R https://example.com -U john_doe -P "Lorem Ipsum" > access_token.txt
```

To-do
-----

- [x] Add support to both HTTP and HTTPS. (Currently only supports HTTPS)
- [ ] Allow direct importing as a Node module.
- [ ] Add option to import a configuration file.

