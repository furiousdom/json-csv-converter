'use strict';

const { extname, isAbsolute, resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

function readInput(filePath) {
  const absolutePath = getAbsolutePath(filePath);
  const extension = extname(absolutePath);
  const data = readFileSync(absolutePath);
  return extension === '.ndjson' ? parseNdjson(data) : JSON.parse(data);
}

function writeOutput(filePath, data) {
  const absolutePath = getAbsolutePath(filePath);
  try {
    writeFileSync(absolutePath, data);
  } catch (error) {
    throw new Error(`Unresolvable output path "${absolutePath}".`);
  }
}

module.exports = { readInput, writeOutput };

const getAbsolutePath = path => !isAbsolute(path) ? resolve(path) : path;

const parseNdjson = data => data.toString().split(/\r?\n/).map(parseJson);

function parseJson(data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
}
