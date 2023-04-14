const fs = require('fs');
const sharp = require('sharp');

async function resizeImages() {
  // Read parameters from JSON file
  const params = JSON.parse(await fs.promises.readFile('parameters.json'));
  const maxWidth = params.maxWidth;
  const imagesDir = params.imagesDir;

  // Function to process an individual image file
  async function processImageFile(path, maxWidth) {
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
          await processImageFile(`${path}/${item.name}`, maxWidth);
        }
      }
    }
  }

  // Call the main function with the current working directory
  processDirectory(`./${imagesDir}`);
}

resizeImages();