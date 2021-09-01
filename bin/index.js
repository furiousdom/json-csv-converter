#! /usr/bin/env node
'use strict';

const { argv, yargs } = require('./yargsInit');
const { parseFilePaths, parseOptions } = require('./utils');
const { readInput, writeOutput } = require('../lib/fileHandler');
const { convert } = require('../lib/converter');

const { inputFilePath, outputFilePath } = parseFilePaths(argv);
const opts = parseOptions(argv);

if (!(inputFilePath || outputFilePath)) {
  yargs.showHelp();
  return;
}

const data = readInput(inputFilePath);
const csvCode = convert(data, opts);
writeOutput(outputFilePath, csvCode);
console.log('Program finished.');
