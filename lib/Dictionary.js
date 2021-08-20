'use strict';

class Dictionary {
  #data;

  constructor(separator, data) {
    this.accumulator = [];
    this.#data = data;
    this.propPath = '';
    this.separator = separator;
  }

  get data() {
    return !Array.isArray(this.#data) ? [this.#data] : this.#data;
  }

  set data(data) {
    this.#data = data;
  }

  convert(obj, idx) {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      this.propPath = this.propPath ? `${this.propPath}${this.separator}${key}` : key;

      if (value instanceof Object) {
        this.convert(value, idx);
      } else {
        this.accumulator[idx][this.propPath] = value;
      }

      const position = this.propPath.lastIndexOf(this.separator);
      const slicePos = position === -1 ? 0 : position;
      this.propPath = this.propPath.slice(0, slicePos);
    });
  }

  dictionarize() {
    this.data.forEach(it => this.accumulator.push({}));
    this.data.forEach(this.convert, this);
    return this.accumulator;
  }
}

module.exports = Dictionary;
