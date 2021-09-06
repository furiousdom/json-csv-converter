'use strict';

module.exports = {
  config: { alias: 'c', type: 'string', demandOption: false, describe: 'Enter a path to a config file instead of setting flags as arguments.' },
  keepEmptyRows: { alias: 'k', type: 'boolean', demandOption: false, describe: 'Preserve empty rows.' },
  eol: { alias: 'E', type: 'string', demandOption: false, describe: 'Enter End Of Line (EOL) character to be used. Default is dependent on the operting system.' },
  delimiter: { alias: 'd', type: 'string', demandOption: false, describe: 'Enter a delimiter to be used in the new file.' },
  propSeparator: { alias: 's', type: 'string', demandOption: false, describe: 'Enter a separator for object\'s flattened property name.' },
  excludeHeader: { alias: 'h', type: 'boolean', demandOption: false, describe: 'Don\'t incldue column names.' },
  excludeProps: { alias: 'e', type: 'array', demandOption: false, describe: 'Enter the properties you want to exclude from the final document. Please specify full path (from the top level property).' },
  renameProps: { alias: 'r', type: 'array', demandOption: false, describe: 'Enter the properties you want renamed in the final document. If provided the program will prompt for the new paths. Please specify full path (from the top level property).' }
};
