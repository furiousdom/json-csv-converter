'use strict';

const { extname, resolve } = require('path');
const { EOL } = require('os');
const prompt = require('prompt-sync')({ sigint: true });

function parseFilePaths(argv) {
  const errMsg = 'Missing arguments. Please provide both input & output paths.';
  if (argv._.length === 0) throw new Error(errMsg);
  const [inputPath, outputPath] = argv._;
  return { inputPath, outputPath: outputPath || getDefaultOutputPath(inputPath) };
}

function parseOptions(argv) {
  const path = argv.config || argv.c;
  const options = getOptions(path ? readConfig(path, argv) : argv);
  return checkCompatibility(options);
}

module.exports = { parseFilePaths, parseOptions };

function getDefaultOutputPath(inputPath) {
  return inputPath.slice(0, inputPath.lastIndexOf('.')).concat('.csv');
}

function readConfig(path, argv) {
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

const camelize = name => name.replace(/-./g, x => x.toUpperCase()[1]);

function getOptions(argv) {
  return {
    eol: parseEOL(argv.eol || argv.E),
    delimiter: (argv.delimiter || argv.d) || ',',
    excludeProps: (argv.excludeProps || argv.e) || [],
    propSeparator: (argv.propSeparator || argv.s) || '/',
    keepEmptyRows: (argv.keepEmptyRows || argv.k) || false,
    excludeHeader: (argv.excludeHeader || argv.h) || false,
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
  const checker = it => it instanceof Object && 'propPath' in it && 'value' in it;
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
  const strProps = props.filter(it => typeof it === 'string');
  return strProps.map(propPath => ({ propPath, value: prompt(prompter(propPath)) }));
}

function checkCompatibility(options) {
  const separator = options.propSeparator;
  const foundInEx = options.excludeProps.find(it => it.includes(separator));
  const foundInRe = options.renameProps.find(it => it.propPath.includes(separator));
  const foundInSet = options.setPropValues.find(it => it.propPath.includes(separator));
  if (foundInEx || foundInRe || foundInSet) return options;
  return changePropSeparator(options, separator);
}

function changePropSeparator(options, oldSeparator) {
  const propSeparator = prompt(
    `The property separator "${oldSeparator}" wasn't found in\
    any of the transformers. Enter a new one (or hit ENTER to keep it): `
  );
  if (propSeparator === '') return options;
  return { ...options, propSeparator };
}
