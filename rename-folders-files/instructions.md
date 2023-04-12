# Renaming Files and Folders

This script renames all files and folders in a specified directory to follow a specified naming convention. The script can replace specific characters in the names, change the case of the names, and exclude files with specific extensions.

## Instructions

1. Open the script in your preferred code editor.
2. Replace the contents of the `config.json` file with the desired configuration.
3. Run the script to rename all files and folders in the specified directory.

## Usage

The function `renameFilesAndFolders` takes four parameters:

- `path`: The path of the directory containing the files and folders you want to rename.
- `replaceObj`: An object containing the characters you want to replace and their replacements.
- `caseOption`: The case you want the names to be in. Valid values are `'lowercase'`, `'uppercase'`, and `'capitalize'`.
- `excludedExtensions`: An array containing the file extensions you want to exclude from being renamed.

The configuration for the script is stored in the `parameters.json` file. Here is an example of the file's contents:

```json
{
  "path": "./",
  "replaceObj": {
    " ": "-",
    "&": "-",
    "%": "",
    "$": ""
  },
  "caseOption": "lowercase",
  "excludedExtensions": [".js", ".exe", ".html", ".css", ".md"]
}
```

To run the script, simply call the function with the parameters from the configuration file:

```
const params = JSON.parse(fs.readFileSync('./parameters.json'));

renameFilesAndFolders(params.path, params.replaceObj, params.caseOption, params.extensions);
```

## Creating an executable file

You can also create an executable file to run the program. Follow these steps:

1. If you don't have it already, install `pkg` globally by running the command `npm install -g pkg`.
2. Run the command `pkg rename-folders-files.js --target node14-win-x64 --external sharp` to create an executable file for Windows.
