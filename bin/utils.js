'use strict';

function parseOptions(argv) {
  return {
    noHeader: argv.header || false,
    propSeparator: (argv.propSeparator || argv.s) || '/',
    delimiter: (argv.delimiter || argv.d) || ',',
    excludeProps: (argv.excludeProps || argv.e) || [],
    renameProps: renamePrompt(argv.renameProps || argv.r)
  };
}

function parseFilePaths(argv) {
  if (argv._.length !== 2) return {};
  const [inputFilePath, outputFilePath] = argv._;
  return { inputFilePath, outputFilePath };
}

module.exports = { parseFilePaths, parseOptions };

function renamePrompt(props) {
  if (!props?.length) return [];
  const prompt = require('prompt-sync')({ sigint: true });
  return props.map(oldName => ({
    oldName,
    newName: prompt(`How do you want to rename ${oldName} property? `)
  }));
}
