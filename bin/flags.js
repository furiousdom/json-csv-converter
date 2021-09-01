'use strict';

module.exports = {
  config: { alias: 'c', type: 'string', demandOption: false, describe: 'Enter a path to a config file instead of setting flags as arguments.' },
  eol: { alias: 'E', type: 'string', demandOption: false, describe: 'Enter End Of Line (EOL) character to be used. Default is dependent on the operting system.' },
  delimiter: { alias: 'd', type: 'string', demandOption: false, describe: 'Enter a delimiter to be used in the new file.' },
  propSeparator: { alias: 's', type: 'string', demandOption: false, describe: 'Enter a separator for object\'s flattened property name.' },
  excludeHeader: { alias: 'h', type: 'boolean', demandOption: false, describe: 'Include this flag to not incldue column names.' },
  excludeProps: { alias: 'e', type: 'array', demandOption: false, describe: 'Enter the properties you want to exclude from the final document.' },
  renameProps: { alias: 'r', type: 'array', demandOption: false, describe: 'Enter the properties you want renamed in the final document. If you enter them the program will prompt you for the new names' }
};
