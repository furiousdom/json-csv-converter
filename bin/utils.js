'use strict';

const { EOL } = require('os');
const flags = require('./flags');
const { readInput } = require('../lib/fileHandler');

function parseFilePaths(argv) {
  if (argv._.length !== 2) return {};
  const [inputFilePath, outputFilePath] = argv._;
  return { inputFilePath, outputFilePath };
}

function parseOptions(argv) {
  if (!(argv.config || argv.c)) return getOptions(argv);
  const data = readInput((argv.config || argv.c));
  Object.keys(flags).forEach(key => {
    // eslint-disable-next-line
    if (data.hasOwnProperty(key)) data[camelize(key)] = data[key];
  });
  return getOptions(Object.assign(data, argv));
}

module.exports = { parseOptions, parseFilePaths };

function camelize(name) {
  return name.replace(/-./g, x => x.toUpperCase()[1]);
}

function getOptions(argv) {
  return {
    excludeHeader: (argv.excludeHeader || argv.h) || false,
    eol: parseEOL(argv.eol || argv.E),
    propSeparator: (argv.propSeparator || argv.s) || '/',
    delimiter: (argv.delimiter || argv.d) || ',',
    excludeProps: (argv.excludeProps || argv.e) || [],
    renameProps: renamePrompt(argv.renameProps || argv.r)
  };
}

function parseEOL(eolFlag) {
  if (eolFlag === 'rn' || eolFlag === '\\r\\n') return '\r\n';
  if (eolFlag === 'n' || eolFlag === '\\n') return '\n';
  return EOL;
}

function renamePrompt(props) {
  if (!props?.length) return [];
  const prompt = require('prompt-sync')({ sigint: true });
  return props.map(oldPath => ({
    oldPath,
    newPath: prompt(`How do you want to rename ${oldPath} property? `)
  }));
}

// function intersectWithArgs(config, argv) {
//   const accumulator = {};
//   Object.keys(config).forEach(key => {
//     if (!(argv.includes(key) || argv.includes(flags[key]?.alias))) accumulator[key] = config[key];
//   });
//   return Object.assign(argv, accumulator);
// }

// function getFlagAlias(flag) {
//   const flagAliases = {};
//   Object.keys(flags).forEach(key => {
//     const camelizedKey = key.includes('-') ? camelize(key) : '';
//     const alias = flags[key]?.alias;
//     const aliases = Array.isArray(alias)
//       ? alias.concat(camelizedKey)
//       : [alias, camelizedKey];
//     Object.defineProperty(flagAliases, key, { value: aliases });
//   });
// }
