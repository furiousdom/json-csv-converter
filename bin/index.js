#! /usr/bin/env node
'use strict';

const { parseFilePaths, parseOptions } = require('./utils');
const { readInput, writeOutput } = require('../lib/fileHandler');
const { convert } = require('../lib/converter');
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs');

const argv = yargs(hideBin(process.argv)).argv;

yargs
  .usage('\nUsage: json-csv-converter [OPTIONS] -- <input_file_path> <output_file_path>')
  .option('header', { describe: 'Do not incldue column names.', type: 'boolean', default: false, demandOption: false })
  .option('prop-separator <separator>', { describe: 'Enter a separator for object\'s flattened property name.', type: 'string', demandOption: false })
  .option('delimiter <delimiter>', { alias: 'd', describe: 'Enter a delimiter to be used in the new file.', type: 'string', demandOption: false });

const files = parseFilePaths(argv);

const opts = parseOptions(argv);

if (!files) {
  yargs.showHelp();
  return;
}

const { inputFilePath, outputFilePath } = files;

const data = readInput(inputFilePath);
const csvCode = convert(data, opts);
writeOutput(outputFilePath, csvCode);
console.log('Program finished.');
