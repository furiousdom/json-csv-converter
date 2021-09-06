'use strict';

const { isEmpty } = require('lodash');

function convert(data, options) {
  const { delimiter, eol, excludeHeader } = options;
  const arrData = !Array.isArray(data) ? [data] : data;
  const dictionaries = unwind(arrData, options);
  const processedData = options.keepEmptyRows
    ? dictionaries
    : dictionaries.filter(it => !isEmpty(it));
  return transformToRows(processedData, delimiter, eol, excludeHeader);
}

module.exports = { convert };

function unwind(data, options) {
  const flatten = (obj, accumulator, propPath) => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newPropPath = getNewPropPath(propPath, key, options);

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
