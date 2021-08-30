'use strict';

function convert(data, options) {
  const { delimiter, eol, excludeHeader } = options;
  const arrData = !Array.isArray(data) ? [data] : data;
  const processedData = unwind(arrData, options);
  return transformToRows(processedData, delimiter, eol, excludeHeader);
}

module.exports = { convert };

function unwind(data, options) {
  return data.map(it => {
    const flatten = (obj, accumulator, propPath) => {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        const newPropPath = getNewPropPath(propPath, key, options);

        if (!newPropPath) return;
        if (value instanceof Object) return flatten(value, accumulator, newPropPath);
        accumulator[newPropPath] = value;
      });

      return accumulator;
    };

    return flatten(it, {});
  });
}

function getNewPropPath(currentPath, key, opts) {
  const testPath = currentPath ? `${currentPath}${opts.propSeparator}${key}` : key;
  if (opts.excludeProps.includes(testPath)) return null;
  const rename = opts.renameProps.find(it => it.oldName === testPath);
  return rename ? rename.newName : testPath;
}

function transformToRows(data, delimiter, eol, excludeHeader) {
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
  return csvCode.map(el => el.join(delimiter)).join(eol);
}
