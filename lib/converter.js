'use strict';

function convert(data, options) {
  const { noHeader, delimiter } = options;
  data = !Array.isArray(data) ? [data] : data;
  data = data.map(flatten, options);
  return transformToRows(data, delimiter, noHeader);
}

module.exports = { convert };

function flatten(obj) {
  const process = (obj, accumulator, propPath) => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newPropPath = getNewPropPath(propPath, key, this);

      if (!newPropPath) return;
      if (value instanceof Object) return process(value, accumulator, newPropPath);
      accumulator[newPropPath] = value;
    });

    return accumulator;
  };

  return process(obj, {});
}

function getNewPropPath(currentPath, key, opts) {
  const testPath = currentPath ? `${currentPath}${opts.propSeparator}${key}` : key;
  if (opts.excludeProps.includes(testPath)) return null;
  const rename = opts.renameProps.find(it => it.oldName === testPath);
  return rename ? rename.newName : testPath;
}

function transformToRows(data, delimiter, excludeHeader) {
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

  if (!excludeHeader) csvCode.unshift(headers);
  return csvCode.map(el => el.join(delimiter)).join('\n');
}
