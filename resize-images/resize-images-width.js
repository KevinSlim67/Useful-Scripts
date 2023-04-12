//npm init -y
//npm i sharp --save

//node resize-images.js

//or 

//do this to get a .exe file
//npm install -g pkg (installs pkg globally)
//pkg resize-images.js --target node14-win-x64 --external sharp


const fs = require('fs');
const sharp = require('sharp');

const maxWidth = 1920;

// Function to process an individual image file
async function processImageFile(path) {
  const image = sharp(path);
  const metadata = await image.metadata();
  if (metadata.width > maxWidth) {
    const newWidth = maxWidth;
    const newHeight = Math.round(metadata.height * newWidth / metadata.width);
    await image.resize(newWidth, newHeight).toBuffer().then((buffer) => {
      fs.writeFile(path, buffer, (error) => {
        if (error) {
          console.error(`Error writing file ${path}: ${error}`);
        } else {
          console.log(`Processed file ${path}`);
        }
      });
    });
  }
}

// Function to process a directory
async function processDirectory(path) {
  const items = await fs.promises.readdir(path, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      await processDirectory(`${path}/${item.name}`);
    } else {
      if (item.name.match(/\.(jpg|jpeg|png|webp)$/i)) {
        await processImageFile(`${path}/${item.name}`);
      }
    }
  }
}

// Call the main function with the current working directory
processDirectory('.');
