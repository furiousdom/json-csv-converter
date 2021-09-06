#! /usr/bin/env node
'use strict';

const { argv, yargs } = require('./yargs');
const { parseFilePaths, parseOptions } = require('./utils');
const { readInput, writeOutput } = require('../lib/fileHandler');
const { convert } = require('../lib/converter');

const defaultErrorCode = -1;

try {
  const { inputFilePath, outputFilePath } = parseFilePaths(argv);
  const opts = parseOptions(argv);

  if (!(inputFilePath || outputFilePath)) {
    throw new Error('Missing arguments. Please provide both input and output paths.');
  }

  const data = readInput(inputFilePath);
  const csvCode = convert(data, opts);

  writeOutput(outputFilePath, csvCode);
  console.log('Converting finished.');
  yargs.exit();
} catch (err) {
  console.error(err.message);
  yargs.exit((err.errno || defaultErrorCode));
}
