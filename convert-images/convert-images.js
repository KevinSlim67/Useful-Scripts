const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function convertImages() {

    // Read the parameters from the parameters.json file on runtime
    const params = JSON.parse(await fs.promises.readFile('parameters.json'));


    // Define the input and output file formats
    const inputFormat = params.inputFormat;
    const outputFormat = params.outputFormat;
    const inputDiv = params.inputDiv;
    const outputDiv = params.outputDiv;

    // A function to check if a file is an image based on its extension
    function isImage(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        return inputFormat.includes(ext.substring(1));
    }

    // A function to convert an image file to the output format
    async function convertImage(inputFilePath, outputDirPath, inputFormat, outputFormat) {
        const image = sharp(inputFilePath);
        const outputFileName = path.basename(inputFilePath, path.extname(inputFilePath)) + `.${outputFormat}`;
        const outputFilePath = path.join(outputDirPath, path.relative(path.join(process.cwd(), inputDiv), inputFilePath)).replace(path.extname(inputFilePath), `.${outputFormat}`);
        const buffer = await image.toFormat(outputFormat).toBuffer();
        await fs.promises.mkdir(path.dirname(outputFilePath), { recursive: true });
        await fs.promises.writeFile(outputFilePath, buffer);
        console.log(`Converted ${inputFilePath} to ${outputFilePath}`);
    }

    // A recursive function to loop through all files in a directory and its sub-directories
    async function loopDir(dirPath, outputDirPath, inputFormat, outputFormat) {
        const files = await fs.promises.readdir(dirPath);
        for (const file of files) {
            const inputFilePath = path.join(dirPath, file);
            const stats = await fs.promises.stat(inputFilePath);
            if (stats.isDirectory()) {
                await loopDir(inputFilePath, outputDirPath, inputFormat, outputFormat);
            } else if (stats.isFile() && isImage(inputFilePath)) {
                await convertImage(inputFilePath, outputDirPath, inputFormat, outputFormat);
            }
        }
    }

    // A function to clear the previous output directory
    async function clearOutputDir(outputDirPath) {
        try {
            const files = await fs.promises.readdir(outputDirPath);
            for (const file of files) {
                const filePath = path.join(outputDirPath, file);
                const stats = await fs.promises.stat(filePath);
                if (stats.isDirectory()) {
                    await clearOutputDir(filePath);
                    await fs.promises.rmdir(filePath);
                } else {
                    await fs.promises.unlink(filePath);
                }
            }
        } catch (error) {
            console.error(`Error clearing output directory ${outputDirPath}: ${error}`);
        }
    }

    // Start the script by clearing the output directory and then calling loopDir with the images directory and the output directory
    const inputDirPath = path.join(process.cwd(), inputDiv);
    const outputDirPath = path.join(process.cwd(), outputDiv);
    clearOutputDir(outputDirPath).then(() => loopDir(inputDirPath, outputDirPath, inputFormat, outputFormat));
};

//runs the program and then pauses it so the command prompt doesn't exit
convertImages().then(() => {
    console.log('Press any key to exit...');
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0));
});
