# Image Conversion Script

This script converts all images in a specified directory to a specified format using the [Sharp](https://github.com/lovell/sharp) library. 

## Initialization

Before running the program, make sure you have initialized the necessary files by following these steps:

1. Specify the name of the input folder you want in `parameters.json`, by default it's `input`.
2. Create a folder named "input" in the directory where you want to run the program.
3. Add the images you want to convert to the "input" folder.
4. Open a terminal or command prompt window in the directory where you want to run the program.
5. Run the command `npm i sharp --save` to install the `sharp` package, which is necessary for image processing.
6. Replace `outputFormat` inside `parameters.json` to the format you want to convert your images to.
7. Run the script to convert all images in the specified directory.


## Usage

The function `convertImages` takes four parameters:

1. `path`: The path of the directory containing the images you want to convert.
2. `outputFormat`: The format you want the images to be converted to. Valid values are `'jpeg'`, `'png'`, `'jpg'`, `'JPG'` and `'webp'`.
3. `inputDiv`: The name of the folder containing the input images.
4. `outputDiv`: The name of the folder where the converted images will be saved.

The configuration for the script is stored in the `parameters.json` file. Here is an example of the file's contents:

```json
{
    "inputFormat": ["png", "jpg", "JPG", "webp", "jpeg"],
    "outputFormat": "webp",
    "inputDiv": "input",
    "outputDiv": "output"
}
```

To run the script, simply call the function with the parameters from the parameters file:

```
const params = JSON.parse(fs.readFileSync('./parameters.json'));

convertImages(params.path, params.outputFormat, params.width);
```

## Creating an executable file

You can also create an executable file to run the program. Follow these steps:

1. If you don't have it already, install `pkg` globally by running the command `npm install -g pkg`.
2. Run the command `pkg convert-images.js --target node14-win-x64 --external sharp` to create an executable file for Windows.