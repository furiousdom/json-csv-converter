'use strict';

function parseFilePaths(argv) {
  const errMsg = 'Missing arguments. Please provide at least the input path.';
  if (argv._.length === 0) throw new Error(errMsg);
  const [inputPath, outputPath] = argv._;
  return { inputPath, outputPath: outputPath || getDefaultOutputPath(inputPath) };
}

module.exports = { parseFilePaths };

function getDefaultOutputPath(inputPath) {
  return inputPath.slice(0, inputPath.lastIndexOf('.')).concat('.csv');
}
