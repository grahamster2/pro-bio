const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function processImage(imagePath) {
    if (!fs.existsSync(imagePath)) {
        console.log(`Does not exist: ${imagePath}`);
        return;
    }
    const dirname = path.dirname(imagePath);
    const ext = path.extname(imagePath);
    const basename = path.basename(imagePath, ext);
    const tempPath = path.join(dirname, `${basename}_temp${ext}`);

    try {
        await sharp(imagePath)
            .trim() // Trims transparent edges automatically
            .toFile(tempPath);

        fs.renameSync(tempPath, imagePath);
        console.log(`Successfully trimmed ${imagePath}`);
    } catch (e) {
        console.error(`Failed to trim ${imagePath}:`, e);
    }
}

async function main() {
    await processImage(path.resolve('public', 'logo.png'));
    await processImage(path.resolve('src', 'app', 'icon.png'));
}

main();
