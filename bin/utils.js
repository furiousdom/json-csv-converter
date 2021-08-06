'use strict';

const yargs = require('yargs');

function parseFilePaths(args) {
  const files = [];
  if (!args.length) yargs.showHelp();
  else {
    args.forEach((arg, i) => {
      files.push(arg);
    });
  }
  return files;
}

module.exports = { parseFilePaths };
