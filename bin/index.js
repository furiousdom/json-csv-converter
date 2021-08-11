#! /usr/bin/env node
'use strict';

const { readInput, writeOutput } = require('./fileHandler');
const { convert } = require('./utils');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs');

const argv = yargs(hideBin(process.argv)).argv._;
yargs.usage('\nUsage: json-csv-converter <json_file_path> <csv_file_path>');

if (!argv.length) {
  yargs.showHelp();
  return;
}

const [jsonFilePath, csvFilePath] = argv;
const data = readInput(jsonFilePath);
const csvCode = convert(data);
writeOutput(csvFilePath, csvCode);
console.log('Program finished.');
