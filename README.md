<div align="center">
  <h1>json-csv-converter</h1>
  <p><i>CLI tool for converting JSON to CSV files.</i></p>
</div>

<div align="center">
  <a href="https://github.com/furiousdom/json-csv-converter/stargazers">
    <img src="https://img.shields.io/github/stars/furiousdom/json-csv-converter?style=for-the-badge" alt="Stars Badge" />
  </a>
  <a href="https://github.com/furiousdom/json-csv-converter/network/members">
    <img src="https://img.shields.io/github/forks/furiousdom/json-csv-converter?style=for-the-badge" alt="Forks Badge" />
  </a>
  <a href="https://github.com/furiousdom/json-csv-converter/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/furiousdom/json-csv-converter?style=for-the-badge" alt="GitHub Contributors Badge" />
  </a>
  <a href="https://github.com/furiousdom/json-csv-converter/pulls">
    <img src="https://img.shields.io/github/issues-pr/furiousdom/json-csv-converter?style=for-the-badge" alt="Pull Requests Badge" />
  </a>
  <a href="https://github.com/furiousdom/json-csv-converter/issues">
    <img src="https://img.shields.io/github/issues/furiousdom/json-csv-converter?style=for-the-badge" alt="Issues Badge" />
  </a>
  <a href="https://github.com/furiousdom/json-csv-converter/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/furiousdom/json-csv-converter?style=for-the-badge" alt="License Badge" />
  </a>
</div>

<br />

<div align="center">
  <p>
    <a href="https://github.com/furiousdom/json-csv-converter/issues">Report Bug</a>
    ·
    <a href="https://github.com/furiousdom/json-csv-converter/issues">Request Feature</a>
  </p>
</div>



## About The Project

This program converts JSON files into CSV files.

Features:

- Supports standard JSON as well as NDJSON
- Setting custom delimiters
- Setting custom property separators
- Setting custom eol values
- Preserving new lines
- Header exclusion
- Excluding properties
- Renaming properties
- Setting new values to properties



### Built With

* [Node.js](https://nodejs.org/en/)



## Getting Started

To get a local copy up and running follow these simple steps.



### Prerequisites

Before you begin, ensure you have met the following requirements:
* You have a **macOS** machine. It may work on **Linux and Windows**, but they are not supported.
* You have installed [Node.js](https://nodejs.org/en/) (version `>=16.6.0`)



### Installation

1. Clone the repo
   ```
   git clone https://github.com/furiousdom/json-csv-converter.git
   ```
2. Move to project directory
   ```
   cd json-csv-converter
   ```



### Usage

1. Run it from the project folder:
   ```
   npm run dev [options] -- <json_file_path> <csv_file_path>
   ```

2. `json-csv-converter` can be called from the command line if installed globally:
   ```
   npm install -g .
   ```

    ```bash
    Usage: json-csv-converter [options] -- <json_file_path> <csv_file_path>

    Options:
      -c, --config         <path>             Path to a config file with options. File should be JS or JSON.       (default: None)
      -k, --keepEmptyRows                     Preserve empty rows.                                                 (default: false)
      -h, --excludeHeader                     Exclude column names.                                                (default: false)
      -E, --eol            <windows | unix>   Defines the End Of Line (EOL) character.                             (default: OS based)
      -d, --delimiter      <character>        Character to be used as a delimiter between each CSV cell.           (default: ",")
      -S, --propSeparator  <separator>        Character to separate properties when flattened.                     (default: "/")
      -e, --excludeProps   [properties]       List of properties to be excluded. *                                 (default: [])
      -r, --renameProps    [properties]       List of properties to be renamed. *, **                              (default: [])
      -s, --setPropValues  [properties]       List of properties whose value is to be changed. *, **               (default: [])
          --version                           Show version number.
          --help                              Show help.


      *     The properties need to be fully specified by their flattened paths.
      **    The user will be prompted to enter the replacement values (new property path or new property value).

      Flags provided through the CLI will overwrite their configuration file counterparts, if both are provided.
      Long flags can be written using both "camelCase" and "pascal-case" in both the config file and CLI.
    ```


## Roadmap

For a list of proposed features (and known issues) see the [open issues](https://github.com/furiousdom/json-csv-converter/issues).



## Contributing

Contributions are what make the open source community such an amazing place to be, learn, inspire, and create. Any contributions are **greatly appreciated**.

To contribute to json-csv-converter please create a pull request.
You can see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).



## Acknowledgements

* [Antonio Bašić](https://github.com/abasic)



## Contact

Dominik Tabak - <tabakdominik@gmail.com>



## License

Distributed under the [MIT](https://opensource.org/licenses/MIT) License. See `LICENSE` for more information.
