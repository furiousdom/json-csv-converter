'use strict';

class Dictionary {
  constructor(separator, data) {
    this.accumulator = {};
    this.separator = separator;
    this.propPath = '';

    if (data) this.dictionarize(data);
  }

  convert(obj) {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      this.propPath = this.propPath ? `${this.propPath}${this.separator}${key}` : key;

      if (value instanceof Object) {
        this.convert(value);
      } else {
        this.accumulator[this.propPath] = value;
      }

      const position = this.propPath.lastIndexOf(this.separator);
      const slicePos = position === -1 ? 0 : position;
      this.propPath = this.propPath.slice(0, slicePos);
    });
  }

  dictionarize(data) {
    data = !Array.isArray(data) ? [data] : data;
    data.map(this.convert, this);
  }
}

module.exports = Dictionary;
