const fs = require('fs');
const { join } = require('path');
const sharp = require('sharp');

const artVerse = async () => {
    const artVerse = join(__dirname, 'assets', 'raw', 'Artverse.tif');

    await sharp(artVerse, { limitInputPixels: false })
        .resize({
            width: 1600,
        })
        .jpeg({ quality: 80 })
        .toFile(join(__dirname, 'assets', 'site', 'Artverse.jpg'));
};

const site = async () => {
    await artVerse();
};

module.exports = {
    site,
};
