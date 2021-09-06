'use strict';

const { EOL } = require('os');
const { readInput } = require('../lib/fileHandler');

function parseFilePaths(argv) {
  if (argv._.length !== 2) return {};
  const [inputFilePath, outputFilePath] = argv._;
  return { inputFilePath, outputFilePath };
}

function parseOptions(argv) {
  if (!(argv.config || argv.c)) return getOptions(argv);
  const data = readInput((argv.config || argv.c));
  Object.keys(data).forEach(key => (data[camelize(key)] = data[key]));
  return getOptions(Object.assign(data, argv));
}

module.exports = { parseFilePaths, parseOptions };

function camelize(name) {
  return name.replace(/-./g, x => x.toUpperCase()[1]);
}

function getOptions(argv) {
  return {
    keepEmptyRows: (argv.keepEmptyRows || argv.k) || false,
    excludeHeader: (argv.excludeHeader || argv.h) || false,
    eol: parseEOL(argv.eol || argv.E),
    propSeparator: (argv.propSeparator || argv.s) || '/',
    delimiter: (argv.delimiter || argv.d) || ',',
    excludeProps: (argv.excludeProps || argv.e) || [],
    renameProps: getRenamers(argv.renameProps || argv.r)
  };
}

function parseEOL(eolFlag) {
  if (eolFlag === 'windows') return '\r\n';
  if (eolFlag === 'unix') return '\n';
  return EOL;
}

function getRenamers(props) {
  if (!props?.length) return [];
  const renameCheck = it => it instanceof Object && 'oldPath' in it && 'newPath' in it;
  const { renamers, propsForPrompt } = props.reduce((res, item) => {
    res[renameCheck(item) ? 'renamers' : 'propsForPrompt'].push(item);
    return res;
  }, { renamers: [], propsForPrompt: [] });
  const promptedRenamers = renamePrompt(propsForPrompt);
  return renamers.concat(promptedRenamers);
}

function renamePrompt(props) {
  if (!props?.length) return [];
  const prompt = require('prompt-sync')({ sigint: true });
  const promptText = oldPath => `How do you want to rename "${oldPath}" property? `;
  return props.map(oldPath => ({ oldPath, newPath: prompt(promptText(oldPath)) }));
}
