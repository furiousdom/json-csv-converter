'use strict';

const last = require('lodash/last');

function isPropPathArray(propPath) {
  return propPath instanceof Array && propPath.every(it => typeof it === 'string');
}

function getDividerFunction(firstPropName, secondPropName) {
  return mutator => mutator instanceof Object &&
    firstPropName in mutator &&
    secondPropName in mutator &&
    isPropPathArray(mutator[firstPropName]);
}

function reshapeArgvPathArrays(argv) {
  const excludeProps = makePropPathArrays(argv.excludeProps);
  const renameProps = makePropPathArrays(argv.renameProps);
  const setPropValues = makePropPathArrays(argv.setPropValues);
  return removeUndefinedProperties({
    ...argv,
    excludeProps,
    renameProps,
    setPropValues
  });
}

function makePropPathArrays(pathParts) {
  if (!(pathParts && pathParts?.length)) return;
  return pathParts.reduce((result, pathPart) => {
    if (pathPart === ':') result.push([]);
    else last(result).push(pathPart);
    return result;
  }, [[]]);
}

function removeUndefinedProperties(dirtyObject) {
  Object.keys(dirtyObject).forEach(key => {
    if (!dirtyObject[key]) delete dirtyObject[key];
  });
  return dirtyObject;
}

module.exports = {
  getDividerFunction,
  isPropPathArray,
  reshapeArgvPathArrays
};
