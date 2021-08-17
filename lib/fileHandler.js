'use strict';

const { isAbsolute, resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const getAbsolutePath = path => !isAbsolute(path) ? resolve(path) : path;

function readInput(filePath) {
  const absolutePath = getAbsolutePath(filePath);
  return JSON.parse(readFileSync(absolutePath));
}

function writeOutput(filePath, data) {
  const absolutePath = getAbsolutePath(filePath);
  writeFileSync(absolutePath, data);
}

module.exports = { readInput, writeOutput };
