#! /usr/bin/env node
'use strict';

const fs = require('fs');
const { hideBin } = require('yargs/helpers');
const utils = require('./utils');
const yargs = require('yargs');

const argv = yargs(hideBin(process.argv)).argv._;
yargs.usage('\nUsage: json-csv-converter <json_file_path> <csv_file_path>');

if (!argv.length) {
  yargs.showHelp();
  return;
}

const [jsonFilePath, csvFilePath] = argv;

const arr = JSON.parse(fs.readFileSync(jsonFilePath));

const columns = Object.keys(arr[0]);

const values = utils.getAllValues(arr);

const csvCode = utils.createCsvCode(columns, values);

fs.writeFile(csvFilePath, csvCode, err => {
  if (err) throw err;
  console.log('The file has been saved!');
});
