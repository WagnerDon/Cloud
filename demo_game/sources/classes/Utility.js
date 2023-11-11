class Utility {
  static getExtension(src) {
    const regExp = /[^.]*$/,
      match = src.match(regExp),
      extension = match[0];

    return extension;
  }

  static getBasename(src) {
    const regExp = /[^/]*(?=\.)|[^/]*$/,
      match = src.match(regExp),
      basename = match[0];

    return basename;
  }

  static getFilename(src) {
    const regExp = /[^/]*$/,
      match = src.match(regExp),
      filename = match[0];

    return filename;
  }
}

export default Utility;
