const fs = require('fs');

function renameFilesAndFolders(path) {
  const files = fs.readdirSync(path);
  files.forEach(function (file) {
    const currentPath = path + '/' + file;
    const newPath = currentPath.replace(/([^a-zA-Z0-9])/g, (match, p1) => {
      switch (p1) {
        case ' ':
          return '-';
        case '&':
          return '-';
        case '%':
          return '';
        default:
          return p1;
      }
    }).toLowerCase();
    if (newPath !== currentPath) {
      if (fs.statSync(currentPath).isDirectory()) {
        console.log(`Renaming folder "${currentPath}" to "${newPath}"`);
      } else if (file !== 'script.js') {
        console.log(`Renaming file "${currentPath}" to "${newPath}"`);
      }
      fs.renameSync(currentPath, newPath);
      if (fs.statSync(newPath).isDirectory()) {
        renameFilesAndFolders(newPath);
      }
    }
  });
}

renameFilesAndFolders('./');
