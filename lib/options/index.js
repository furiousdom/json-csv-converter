'use strict';

const { extname, resolve } = require('path');
const { EOL } = require('os');
const flags = require('../cli/flags');
const { getRegulatedMutators } = require('./mutators');
const { reshapeArgvPathArrays } = require('./utils');

function parseOptions(argv) {
  const configPath = argv.config || argv.c;

  argv = reshapeArgvPathArrays(argv);

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
  const optionsObject = {};

  Object.keys(flags).forEach(flag => {
    const alias = flags[flag].alias;
    const defaultValue = flags[flag].defaultValue;
    const flagValue = (argv[flag] || argv[alias]) || defaultValue;
    const value = flag === 'eol' ? parseEOL(flagValue) : flagValue;
    Object.defineProperty(optionsObject, flag, {
      value,
      writable: true,
      enumerable: true
    });
  });

  return optionsObject;
}

function parseEOL(eolFlag) {
  if (eolFlag === 'windows') return '\r\n';
  if (eolFlag === 'unix') return '\n';
  return EOL;
}
