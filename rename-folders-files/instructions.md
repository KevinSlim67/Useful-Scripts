# Renaming Files and Folders

This script renames all files and folders in a specified directory to follow a specified naming convention. The script can replace specific characters in the names, change the case of the names, and exclude files with specific extensions.

## Instructions

1. Open the script in your preferred code editor.
2. Modify the variables in the script to specify the naming convention and file extensions you want to exclude.
3. Run the script to rename all files and folders in the specified directory.

## Usage

The function `renameFilesAndFolders` takes four parameters:

- `path`: The path of the directory containing the files and folders you want to rename.
- `replaceObj`: An object containing the characters you want to replace and their replacements.
- `caseOption`: The case you want the names to be in. Valid values are `'lowercase'`, `'uppercase'`, and `'capitalize'`.
- `excludedExtensions`: An array containing the file extensions you want to exclude from being renamed.

Here is an example of how to use the function:

```js
//letters to replace
const replaceObj = {
  ' ': '-',
  '&': '-',
  '%': ''
};

//word format: lowercase, uppercase or capitalize
const caseOption = 'lowercase';

//extensions to exclude
const excludedExtensions = ['.js', '.exe', '.html', '.css'];

renameFilesAndFolders('./', replaceObj, caseOption, excludedExtensions);
```

