#! /usr/bin/env node
'use strict';

const fs = require('fs');
const utils = require('./utils');
const yargs = require('yargs');

const usage = '\nUsage: json-csv-converter <json_file_path> <csv_file_path>';

const yargsOptions = yargs(process.argv.slice(2))
  .usage(usage)
  .help(true)
  .argv;

const [jsonFilePath, csvFilePath] = utils.parseFilePaths(yargsOptions._);

const jsonFile = fs.readFileSync(jsonFilePath);

const arr = JSON.parse(jsonFile);

let csvCode = '';

Object.keys(arr[0]).forEach((key, i) => {
  csvCode += key;
  const isLastValue = (Object.keys(arr[0]).length - 1) === i;
  if (isLastValue) return;
  csvCode += ',';
});

csvCode += '\n';

arr.forEach(element => {
  const values = Object.values(element);
  values.forEach((val, i) => {
    csvCode += val;
    const isLastValue = (values.length - 1) === i;
    if (isLastValue) return;
    csvCode += ',';
  });
  csvCode += '\n';
});

fs.writeFile(csvFilePath, csvCode, err => {
  if (err) throw err;
  console.log('The file has been saved!');
});
