'use strict';

const { EOL } = require('os');
const { readInput } = require('../lib/fileHandler');
const prompt = require('prompt-sync')({ sigint: true });

function parseFilePaths(argv) {
  const errMsg = 'Missing arguments. Please provide both input and output paths.';
  if (argv._.length === 0) throw new Error(errMsg);
  const [inputPath, outputPath] = argv._;
  return { inputPath, outputPath: outputPath || getDefaultOutputPath(inputPath) };
}

function parseOptions(argv) {
  if (!(argv.config || argv.c)) return getOptions(argv);
  const data = readInput((argv.config || argv.c));
  Object.keys(data).forEach(key => (data[camelize(key)] = data[key]));
  return getOptions(Object.assign(data, argv));
}

module.exports = { parseFilePaths, parseOptions };

function getDefaultOutputPath(inputPath) {
  return inputPath.slice(0, inputPath.lastIndexOf('.')).concat('.csv');
}

const camelize = name => name.replace(/-./g, x => x.toUpperCase()[1]);

function getOptions(argv) {
  return {
    keepEmptyRows: (argv.keepEmptyRows || argv.k) || false,
    excludeHeader: (argv.excludeHeader || argv.h) || false,
    eol: parseEOL(argv.eol || argv.E),
    propSeparator: (argv.propSeparator || argv.s) || '/',
    delimiter: (argv.delimiter || argv.d) || ',',
    excludeProps: (argv.excludeProps || argv.e) || [],
    renameProps: getRenamers(argv.renameProps || argv.r),
    setPropValues: getSetters(argv.setPropValues || argv.v)
  };
}

function parseEOL(eolFlag) {
  if (eolFlag === 'windows') return '\r\n';
  if (eolFlag === 'unix') return '\n';
  return EOL;
}

function getRenamers(props) {
  const checker = it => it instanceof Object && 'oldPath' in it && 'newPath' in it;
  const prompter = oldPath => `How do you want to rename "${oldPath}" property? `;
  return getTransformers(props, checker, prompter);
}

function getSetters(props) {
  const checker = it => it instanceof Object && 'prop' in it && 'value' in it;
  const prompter = prop => `Enter value to set "${prop}" property to? `;
  return getTransformers(props, checker, prompter);
}

function getTransformers(props, checker, prompter) {
  if (!props?.length) return [];
  const { transformers, propsForPrompt } = props.reduce((res, item) => {
    res[checker(item) ? 'transformers' : 'propsForPrompt'].push(item);
    return res;
  }, { transformers: [], propsForPrompt: [] });
  const promptedTransformers = tranformerPrompt(propsForPrompt, prompter);
  return transformers.concat(promptedTransformers);
}

function tranformerPrompt(props, prompter) {
  if (!props?.length) return [];
  return props.map(prop => ({ prop, value: prompt(prompter(prop)) }));
}
