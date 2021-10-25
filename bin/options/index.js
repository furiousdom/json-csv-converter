'use strict';

const { extname, resolve } = require('path');
const { EOL } = require('os');
const { getRegulatedMutators } = require('./mutators');

function parseOptions(argv) {
  const configPath = argv.config || argv.c;

  const dirtyOptions = getOptions(configPath ? readConfigFile(configPath, argv) : argv);

  const mutators = getRegulatedMutators(dirtyOptions);

  return { ...dirtyOptions, ...mutators };
}

module.exports = { parseOptions };

const camelize = name => name.replace(/-./g, x => x.toUpperCase()[1]);

function readConfigFile(path, argv) {
  try {
    const configPath = resolve(path);
    const data = require(configPath);

    Object.keys(data).forEach(key => (data[camelize(key)] = data[key]));

    return Object.assign(data, argv);
  } catch (err) {
    const extension = extname(path);
    const errMsg = extension !== '.js' && extension !== '.json'
      ? 'Invalid config file name. Config file must end with ".js" or ".json"'
      : `Invalid config file.${err.message.slice(err.message.lastIndexOf(':') + 1)}`;
    throw new Error(errMsg);
  }
}

function getOptions(argv) {
  return {
    eol: parseEOL(argv.eol || argv.E),
    delimiter: (argv.delimiter || argv.d) || ',',
    renameProps: (argv.renameProps || argv.r) || [],
    excludeProps: (argv.excludeProps || argv.e) || [],
    setPropValues: (argv.setPropValues || argv.v) || [],
    propSeparator: (argv.propSeparator || argv.s) || '/',
    keepEmptyRows: (argv.keepEmptyRows || argv.k) || false,
    excludeHeader: (argv.excludeHeader || argv.h) || false
  };
}

function parseEOL(eolFlag) {
  if (eolFlag === 'windows') return '\r\n';
  if (eolFlag === 'unix') return '\n';
  return EOL;
}
