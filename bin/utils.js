'use strict';

function parseOptions(argv) {
  return {
    noHeader: argv.header || false,
    propSeparator: argv.propSeparator || '/',
    delimiter: (argv.delimiter || argv.d) || ','
  };
}

function parseFilePaths(argv) {
  if (argv._.length !== 2) return null;
  const [inputFilePath, outputFilePath] = argv._;
  return { inputFilePath, outputFilePath };
}

module.exports = { parseFilePaths, parseOptions };
