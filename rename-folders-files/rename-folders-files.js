const fs = require('fs');

function renameFilesAndFolders(path, replaceObj, caseOption, excludedExtensions) {
  const files = fs.readdirSync(path);
  files.forEach(function (file) {
    const currentPath = path + '/' + file;
    let newPath = currentPath.replace(/([^a-zA-Z0-9])/g, (match, p1) => {
      if (p1 in replaceObj) {
        return replaceObj[p1];
      } else {
        return p1;
      }
    });

    //files that should not be changed
    const excludedFiles = ["rename-folders-files.js", "rename-folders-files.exe", "instructions.md", "parameters.json"]

    //skips files that have the extensions included in parameter, and files that would break the program if altered
    if (excludedFiles.includes(file) && excludedExtensions.includes(getFileExtension(file))) {
      console.log(`Skipping ${file}`);
      return;
    }

    switch (caseOption) {
      case 'lowercase':
        newPath = newPath.toLowerCase();
        break;
      case 'uppercase':
        newPath = newPath.toUpperCase();
        break;
      case 'capitalize':
        newPath = newPath.replace(/(\b|_|-)(\w)/g, (match, p1, p2) => {
          return p1 + p2.toUpperCase();
        });
        break;
    }


    if (newPath !== currentPath) {
      if (fs.statSync(currentPath).isDirectory()) {
        console.log(`Renaming folder "${currentPath}" to "${newPath}"`);
      } else {
        console.log(`Renaming file "${currentPath}" to "${newPath}"`);
      }
      fs.renameSync(currentPath, newPath);
      if (fs.statSync(newPath).isDirectory()) {
        renameFilesAndFolders(newPath, replaceObj, caseOption, excludedExtensions);
      }
    }
  });
}

function getFileExtension(filename) {
  return '.' + filename.split('.').pop();
}

// Read parameters from JSON file
const params = JSON.parse(fs.readFileSync('./parameters.json'));

renameFilesAndFolders(params.path, params.replaceObj, params.caseOption, params.extensions);
