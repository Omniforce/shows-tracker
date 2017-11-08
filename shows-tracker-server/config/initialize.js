const fs = require('fs');
const nconf = require('nconf');

if ( typeof process.env.NODE_ENV === 'undefined' ) {
  process.env.NODE_ENV = 'development'
}

const DEFAULT_CONFIG  = './config/defaults.json';
const PRIVATE_CONFIG  = './config/private.json';

nconf
  .argv()
  .env()
  .file('private', PRIVATE_CONFIG)
  .file('defaults', DEFAULT_CONFIG);
