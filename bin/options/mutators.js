'use strict';

const prompt = require('prompt-sync')({ sigint: true });

function getRegulatedMutators(options) {
  const separator = options.propSeparator;
  const excludedProps = validateExcluders(options.excludeProps, separator);
  const renameProps = validateRenamers(options.renameProps, separator);
  const setPropValues = validateSetters(options.setPropValues, separator);
  return {
    excludedProps,
    renameProps,
    setPropValues
  };
}

module.exports = { getRegulatedMutators };

function validateExcluders(excludedProps, separator) {
  if (!excludedProps?.length) return [];
  return excludedProps.filter(isPropPathArray).map(pathArray => pathArray.join(separator));
}

function validateRenamers(mutators, separator) {
  const opts = {
    firstPropName: 'oldPath',
    secondPropName: 'newPath',
    separator
  };
  const divider = getDividerFunction(opts.firstPropName, opts.secondPropName);
  const prompter = oldPath => `How do you want to rename "${oldPath}" property? `;

  return validateMutators(mutators, opts, divider, prompter);
}

function validateSetters(mutators, separator) {
  const opts = {
    firstPropName: 'propPath',
    secondPropName: 'value',
    separator
  };
  const divider = getDividerFunction(opts.firstPropName, opts.secondPropName);
  const prompter = prop => `Enter value to set "${prop}" property to? `;

  return validateMutators(mutators, opts, divider, prompter);
}

function isPropPathArray(propPath) {
  return propPath instanceof Array && propPath.every(it => typeof it === 'string');
}

function getDividerFunction(firstPropName, secondPropName) {
  return mutator => mutator instanceof Object &&
    firstPropName in mutator &&
    secondPropName in mutator &&
    isPropPathArray(mutator[firstPropName]);
}

function validateMutators(mutators, opts, divider, prompter) {
  if (!mutators?.length) return [];

  const { fullMutators, partialMutators } = segregateMutators(mutators, divider);

  const additionalMutators = completeMutators(partialMutators, opts, prompter);

  return fullMutators.concat(additionalMutators);
}

function segregateMutators(mutators, divider) {
  return mutators.reduce((res, item) => {
    res[divider(item) ? 'fullMutators' : 'partialMutators'].push(item);
    return res;
  }, { fullMutators: [], partialMutators: [] });
}

function completeMutators(partialMutators, opts, prompter) {
  if (!partialMutators?.length) return [];
  return partialMutators
    .filter(isPropPathArray)
    .map(pathArray => promptChange(pathArray, opts, prompter));
}

function promptChange(pathArray, opts, prompter) {
  const propPath = pathArray.join(opts.separator);
  const mutator = {};
  mutator[opts.firstPropName] = propPath;
  mutator[opts.secondPropName] = prompt(prompter(propPath));
  return mutator;
}
