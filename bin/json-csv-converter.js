#! /usr/bin/env node
'use strict';

const { argv, yargs } = require('../lib/cli');
const { readInput, writeOutput } = require('../lib/fileHandler');
const { convert } = require('../lib/converter');
const { parseFilePaths } = require('../lib/utils');
const { parseOptions } = require('../lib/options');

const defaultErrorCode = 1;

try {
  const { inputPath, outputPath } = parseFilePaths(argv);
  const opts = parseOptions(argv);

  const data = readInput(inputPath);
  const csvCode = convert(data, opts);

  writeOutput(outputPath, csvCode);
  console.log('Converting finished.');
  yargs.exit();
} catch (err) {
  console.error(`ERROR: ${err.message}`);
  yargs.exit(err.errno || defaultErrorCode);
}