'use strict';

const utils = require('./utils');
const yargs = require('yargs');

const usage = '\nUsage: json2csv';

const options = yargs(process.argv.slice(2))
  .usage(usage)
  .help(true)
  .argv;

const files = utils.parseFilePaths(yargs.argv._);

console.log(files);
