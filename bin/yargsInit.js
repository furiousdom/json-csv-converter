'use strict';

const flags = require('./flags');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs');

const argv = yargs(hideBin(process.argv))
  .usage('\nUsage: json-csv-converter [OPTIONS] -- <input_file_path> <output_file_path>')
  .options(flags)
  .help()
  .argv;

module.exports = { argv, yargs };
