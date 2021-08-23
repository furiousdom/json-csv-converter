'use strict';

function dictionary(obj) {
  const dictionaryHelper = (obj, accumulator, propPath) => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newPropPath = propPath ? `${propPath}/${key}` : key;
      if (value instanceof Object) dictionaryHelper(value, accumulator, newPropPath);
      else accumulator[newPropPath] = value;
    });
    return accumulator;
  };
  return dictionaryHelper(obj, {});
}

function transformToRows(data) {
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
  csvCode.unshift(headers);
  return csvCode.map(el => el.join()).join('\n');
}

function convert(data) {
  data = !Array.isArray(data) ? [data] : data;
  data = data.map(dictionary);
  return transformToRows(data);
}

module.exports = { convert };
