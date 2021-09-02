'use strict';

const { isAbsolute, resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const getAbsolutePath = path => !isAbsolute(path) ? resolve(path) : path;

function readInput(filePath, isNdjson) {
  const absolutePath = getAbsolutePath(filePath);
  const data = readFileSync(absolutePath);
  if (isNdjson) {
    const lines = data.toString().split(/\r?\n/);
    return lines.slice(0, -1).map(JSON.parse);
  }
  return JSON.parse(data);
}

function writeOutput(filePath, data) {
  const absolutePath = getAbsolutePath(filePath);
  writeFileSync(absolutePath, data);
}

module.exports = { readInput, writeOutput };
