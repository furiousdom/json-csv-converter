'use strict';

const { isEmpty } = require('lodash');

function convert(data, opts) {
  const { delimiter, eol, excludeHeader } = opts;
  const arrData = !Array.isArray(data) ? [data] : data;
  const dictionaries = unwind(arrData, opts);
  const processedData = opts.keepEmptyRows
    ? dictionaries
    : dictionaries.filter(it => !isEmpty(it));
  return transformToRows(processedData, delimiter, eol, excludeHeader);
}

module.exports = { convert };

function unwind(data, opts) {
  const flatten = (obj, accumulator, propPath) => {
    Object.keys(obj).forEach(key => {
      const newPropPath = getNewPropPath(propPath, key, opts);
      const value = getNewValue(newPropPath, obj[key], opts);

      if (!newPropPath) return;
      if (value instanceof Object) return flatten(value, accumulator, newPropPath);
      accumulator[newPropPath] = value;
    });

    return accumulator;
  };
  return data.map(it => flatten(it, {}));
}

function getNewPropPath(currentPath, key, opts) {
  const path = currentPath ? `${currentPath}${opts.propSeparator}${key}` : key;
  if (opts.excludeProps.includes(path)) return null;
  const renamer = opts.renameProps.find(it => it.oldPath === path);
  return renamer ? renamer.newPath : path;
}

function getNewValue(propPath, currentValue, opts) {
  const setter = opts.setPropValues.find(it => it.propPath === propPath);
  const setterVal = setter?.value;

  if (setterVal === undefined || setterVal === null) return currentValue;
  if (typeof setterVal !== 'function') return setterVal;

  try {
    return setterVal(currentValue);
  } catch (err) {
    return 'MUTATION ERROR';
  }
}

function transformToRows(data, delimiter, eol, excludeHeader) {
  const headers = [];

  const csvCode = data.map(element => {
    const entry = [];

    Object.keys(element).forEach(key => {
      const propIndex = headers.includes(key)
        ? headers.indexOf(key)
        : headers.push(key) - 1;
      entry[propIndex] = element[key];
    });

    return entry;
  });

  if (!excludeHeader) csvCode.unshift(headers);
  return csvCode.map(el => el.join(delimiter)).join(eol);
}
