# Instructions

## Initialization

Before running the program, make sure you have initialized the necessary files by following these steps:

1. Create a folder named "image" in the directory where you want to run the program.
2. Add the images you want to modify to the "image" folder.
3. Open a terminal or command prompt window in the directory where you want to run the program.
4. Run the command `npm init -y` to initialize a `package.json` file. This file is necessary for managing dependencies for the project.
5. Run the command `npm i sharp --save` to install the `sharp` package, which is necessary for image processing.

## Running the program

Once you have initialized the necessary files and added the images to the "image" folder, you can run the program by following these steps:

1. Open a terminal or command prompt window in the directory where the program is located.
2. Run the command `node resize-images.js` to run the program using Node.js.
3. The program will automatically search for images in the "image" folder and its subdirectories, and resize any images with a width greater than 1920 pixels (value can be modified) while maintaining the original aspect ratio.

## Creating an executable file

You can also create an executable file to run the program. Follow these steps:

1. Install `pkg` globally by running the command `npm install -g pkg`.
2. Run the command `pkg resize-images.js --target node14-win-x64 --external sharp` to create an executable file for Windows.
