'use strict';

const { getDividerFunction, isPropPathArray } = require('./utils');
const prompt = require('prompt-sync')({ sigint: true });

function getRegulatedMutators(options) {
  const separator = options.propSeparator;
  const excludeProps = validateExcluders(options.excludeProps, separator);
  const renameProps = validateRenamers(options.renameProps, separator);
  const setPropValues = validateSetters(options.setPropValues, separator);
  return {
    excludeProps,
    renameProps,
    setPropValues
  };
}

module.exports = { getRegulatedMutators };

function validateExcluders(excludeProps, separator) {
  if (!excludeProps?.length) return [];
  return excludeProps.filter(isPropPathArray).map(pathArray => pathArray.join(separator));
}

function validateRenamers(mutators, separator) {
  const prompter = oldPath => `How do you want to rename "${oldPath}" property? `;
  return prepareAndValidate(mutators, separator, 'oldPath', 'newPath', prompter);
}

function validateSetters(mutators, separator) {
  const prompter = prop => `Enter value to set "${prop}" property to? `;
  return prepareAndValidate(mutators, separator, 'propPath', 'value', prompter);
}

function prepareAndValidate(mutators, separator, firstPropName, secondPropName, prompter) {
  const opts = { firstPropName, secondPropName, separator };
  const divider = getDividerFunction(firstPropName, secondPropName);
  return validateMutators(mutators, opts, divider, prompter);
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
