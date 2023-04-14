# Reducing Images Size with Same Results

This script is designed to search for all images within a specified folder and its subdirectories that have a width greater than a specified value. It will then resize those images, reducing their width to the specified value while maintaining their original aspect ratio. This can be useful for preparing images for display on websites or other digital platforms where large image sizes can negatively impact loading times and user experience.

## Initialization

Before running the program, make sure you have initialized the necessary files by following these steps:

1. Create a folder named "image" in the directory where you want to run the program.
2. Add the images you want to modify to the "image" folder.
3. Open a terminal or command prompt window in the directory where you want to run the program.
4. Run the command `npm init -y` to initialize a `package.json` file. This file is necessary for managing dependencies for the project.
5. Run the command `npm i sharp --save` to install the `sharp` package, which is necessary for image processing.
6. Replace `maxWidth` inside `parameters.json` to the width that you want to reduce the images to.

## Running the program

Once you have initialized the necessary files and added the images to the "image" folder, you can run the program by following these steps:

1. Open a terminal or command prompt window in the directory where the program is located.
2. Run the command `node resize-images.js` to run the program using Node.js.
3. The program will automatically search for images in the "image" folder and its subdirectories, and resize any images with a width greater than 1920 pixels (value can be modified) while maintaining the original aspect ratio.

## Creating an executable file

You can also create an executable file to run the program. Follow these steps:

1. Install `pkg` globally by running the command `npm install -g pkg`.
2. Run the command `pkg resize-images.js --target node14-win-x64 --external sharp` to create an executable file for Windows.

## Explanation

The script uses the Sharp library to process images. It reads the maximum width for the resized images from a parameters.json file, which should be created in the same directory as the script with the desired maximum width as its only property.

The processDirectory function recursively reads all files in the specified directory and its subdirectories. The processImageFile function resizes individual image files if their width is greater than the specified maximum. Resized images are saved back to their original files.

The script uses asynchronous functions and promises to process images efficiently.
