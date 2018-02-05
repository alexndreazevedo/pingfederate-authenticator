#!/usr/bin/env node

const args = require('./args')(process.argv);
const opts = args.opts();

if (opts.issuer && opts.client && opts.redirect && opts.username && opts.password) {
  require('../lib')(opts);
} else {
  args.help();
}
