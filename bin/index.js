#! /usr/bin/env node
'use strict';

const { argv, yargs } = require('./yargs');
const { parseFilePaths, parseOptions } = require('./utils');
const { readInput, writeOutput } = require('../lib/fileHandler');
const { convert } = require('../lib/converter');

const { inputFilePath, outputFilePath } = parseFilePaths(argv);
const opts = parseOptions(argv);

if (!(inputFilePath || outputFilePath)) {
  yargs.showHelp();
  return;
}

const data = readInput(inputFilePath, opts.ndjson);
const csvCode = convert(data, opts);
writeOutput(outputFilePath, csvCode);
console.log('Converting finished.');
yargs.exit();
