'use strict';

const { EOL } = require('os');

function parseFilePaths(argv) {
  if (argv._.length !== 2) return {};
  const [inputFilePath, outputFilePath] = argv._;
  return { inputFilePath, outputFilePath };
}

function parseOptions(argv) {
  return {
    noHeader: argv.header || false,
    eol: parseEOL(argv.eol || argv.E),
    propSeparator: (argv.propSeparator || argv.s) || '/',
    delimiter: (argv.delimiter || argv.d) || ',',
    excludeProps: (argv.excludeProps || argv.e) || [],
    renameProps: renamePrompt(argv.renameProps || argv.r)
  };
}

module.exports = { parseFilePaths, parseOptions };

function parseEOL(eolFlag) {
  if (eolFlag === 'windows') return '\r\n';
  if (eolFlag === 'unix') return '\n';
  return EOL;
}

function renamePrompt(props) {
  if (!props?.length) return [];
  const prompt = require('prompt-sync')({ sigint: true });
  return props.map(oldName => ({
    oldName,
    newName: prompt(`How do you want to rename ${oldName} property? `)
  }));
}
