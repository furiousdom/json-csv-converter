'use strict';

function parseOptions(argv) {
  return {
    noHeader: argv.header || false,
    propSeparator: (argv.propSeparator || argv.s) || '/',
    delimiter: (argv.delimiter || argv.d) || ',',
    excludeProps: (argv.excludeProps || argv.e) || []
  };
}

function parseFilePaths(argv) {
  if (argv._.length !== 2) return {};
  const [inputFilePath, outputFilePath] = argv._;
  return { inputFilePath, outputFilePath };
}

module.exports = { parseFilePaths, parseOptions };
