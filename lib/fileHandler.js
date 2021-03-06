'use strict';

const { extname, isAbsolute, resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

function readInput(filePath) {
  const absolutePath = getAbsolutePath(filePath);
  const extension = extname(absolutePath);
  const data = readFileSync(absolutePath);
  return extension === '.ndjson' ? parseNdjson(data) : parseJson(data);
}

function writeOutput(filePath, data) {
  const absolutePath = getAbsolutePath(filePath);
  writeFileSync(absolutePath, data);
}

module.exports = { readInput, writeOutput };

const getAbsolutePath = path => !isAbsolute(path) ? resolve(path) : path;

function parseNdjson(data) {
  const lines = data.toString().split(/\r?\n/);
  return lines.map(parseJson).filter(Boolean);
}

function parseJson(data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
}
