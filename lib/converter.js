'use strict';

function dictionary(obj) {
  const dictionaryHelper = (obj, accumulator, propPath) => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newPropPath = propPath ? `${propPath}${this}${key}` : key;

      if (value instanceof Object) return dictionaryHelper(value, accumulator, newPropPath);
      accumulator[newPropPath] = value;
    });

    return accumulator;
  };

  return dictionaryHelper(obj, {});
}

function transformToRows(data, delimiter, excludeHeader) {
  const csvCode = [];
  const headers = [];

  data.forEach(element => {
    const entry = [];

    Object.keys(element).forEach(key => {
      const propIndex = headers.includes(key)
        ? headers.indexOf(key)
        : headers.push(key) - 1;
      entry[propIndex] = element[key];
    });

    csvCode.push(entry);
  });

  if (!excludeHeader) csvCode.unshift(headers);
  return csvCode.map(el => el.join(delimiter)).join('\n');
}

function convert(data, options) {
  const { noHeader, propSeparator, delimiter } = options;
  data = !Array.isArray(data) ? [data] : data;
  data = data.map(dictionary, propSeparator);
  return transformToRows(data, delimiter, noHeader);
}

module.exports = { convert };
