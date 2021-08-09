'use strict';

function getObjectValues(obj) {
  const values = Object.values(obj);
  return values.filter(it => !(it instanceof Object));
}

function getAllValues(arr) {
  return arr.map(getObjectValues);
}

function createCsvLine(arr) {
  return arr.reduce((accumulator, currentValue) => {
    return accumulator + ',' + currentValue;
  });
}

function createCsvLines(csvValues) {
  return csvValues.reduce((accumulator, currentValue) => {
    return accumulator + '\n' + createCsvLine(currentValue);
  });
}

function createCsvCode(csvColumns, csvValues) {
  const csvColumnsText = createCsvLine(csvColumns);
  const csvValuesText = createCsvLines(csvValues);
  return csvColumnsText + '\n' + csvValuesText;
}

module.exports = { getAllValues, createCsvCode };
