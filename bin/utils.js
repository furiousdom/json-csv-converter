'use strict';

const { isArray } = Array;

function getHeaders(data) {
  data = !isArray(data) ? [data] : data;
  const headers = new Set();
  data.forEach(element => {
    Object.keys(element).forEach(key => {
      if (!(element[key] instanceof Object)) headers.add(key);
    });
  });
  return [...headers];
}

function getObjectValues(obj) {
  const values = Object.values(obj);
  return values.filter(it => !(it instanceof Object));
}

function getArrayValues(data) {
  return data.map(getObjectValues);
}

function transformToRows(csvData) {
  return csvData.map(el => el.join()).join('\n');
}

function convert(data) {
  const headers = getHeaders(data);
  const csvData = getArrayValues(data);
  csvData.unshift(headers);
  return transformToRows(csvData);
}

module.exports = { convert };
