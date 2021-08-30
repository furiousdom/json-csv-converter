'use strict';

const { hideBin } = require('yargs/helpers');
const yargs = require('yargs');

const argv = yargs(hideBin(process.argv))
  .usage('\nUsage: json-csv-converter [OPTIONS] -- <input_file_path> <output_file_path>')
  .option('header', { describe: 'Do not incldue column names.', type: 'boolean', default: false, demandOption: false })
  .option('delimiter', { alias: 'd', describe: 'Enter a delimiter to be used in the new file.', type: 'string', demandOption: false })
  .option('prop-separator', { alias: 's', describe: 'Enter a separator for object\'s flattened property name.', type: 'string', demandOption: false })
  .option('exclude-props', { alias: 'e', describe: 'Enter the properties you want to exclude from the final document.', type: 'array', demandOption: false })
  .help()
  .argv;

module.exports = { argv, yargs };