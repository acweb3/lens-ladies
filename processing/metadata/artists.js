const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const camelCase = require('camelcase');
const { execSync } = require('child_process');

const IPFS_TEMP_DIR = '__TEMP__';

const convertFFMPEG = (conversions) => {
    for (const [cmd, conversion] of conversions) {
        try {
            console.log(cmd);
            conversion();
        } catch (e) {
            console.log(e);
        }
    }
};

const getData = () => {
    const raw = fs.readFileSync(
        path.join(__dirname, 'data', 'data.tsv'),
        'utf-8'
    );
    const rows = raw.split('\r\n');
    const columns = rows.map((row) => row.split('\t'));
    const [headers, ...data] = columns;

    return columns.map((attrs) => {
        return attrs.reduce((acc, next, i) => {
            return {
                ...acc,
                [camelCase(headers[i])]: next,
                attributes: [
                    ...(acc.attributes ?? []),
                    {
                        trait_type: headers[i],
                        value: next,
                    },
                ],
            };
        }, {});
    });
};

const ffmpegConversions = [];
const siteMetadata = [];

const artists = async () => {
    const dist = path.join(__dirname, 'artists', 'dist');
    rimraf.sync(dist);
    fs.mkdirSync(dist);
    fs.mkdirSync(path.join(dist, 'images'));
    fs.mkdirSync(path.join(dist, 'videos'));
    fs.mkdirSync(path.join(dist, 'metadata'));
    fs.mkdirSync(path.join(dist, 'metadata', 'chain'));
    fs.mkdirSync(path.join(dist, 'metadata', 'site'));

    const data = getData();
    const dataMap = data.reduce((acc, { camelCase, ...rest }) => {
        return {
            ...acc,
            [camelCase]: rest,
        };
    }, {});

    const artistDirs = fs.readdirSync(path.join(__dirname, 'artists', 'raw'));

    artistDirs.forEach((artistDirName) => {
        const assetDir = fs.readdirSync(
            path.join(__dirname, 'artists', 'raw', artistDirName, 'assets')
        );

        // Write assets
        let image;
        let video;

        assetDir.map((asset) => {
            const [fileName, extName] = asset.split('.');
            if (
                extName.toLowerCase() === 'jpg' ||
                extName.toLowerCase() === 'jpeg'
            ) {
                fs.cpSync(
                    path.join(
                        __dirname,
                        'artists',
                        'raw',
                        artistDirName,
                        'assets',
                        asset
                    ),
                    path.join(
                        __dirname,
                        'artists',
                        'dist',
                        'images',
                        `${camelCase(fileName)}.jpeg`
                    )
                );

                image = `${camelCase(fileName)}.jpeg`;
            } else {
                const source = path.join(
                    __dirname,
                    'artists',
                    'raw',
                    artistDirName,
                    'assets',
                    asset
                );

                if (extName.toLocaleLowerCase() === 'mp4') {
                    fs.cpSync(
                        source,
                        path.join(
                            __dirname,
                            'artists',
                            'dist',
                            'videos',
                            `${camelCase(
                                fileName
                            )}.${extName.toLocaleLowerCase()}`
                        )
                    );
                } else {
                    // # TODO => figure this shit out

                    const cmd = `ffmpeg -i "${source}" ${path.join(
                        __dirname,
                        'artists',
                        'dist',
                        'videos',
                        `${camelCase(fileName)}.mp4`
                    )}`;

                    ffmpegConversions.push([cmd, () => execSync(cmd)]);
                }

                video = `${camelCase(fileName)}.${extName.toLocaleLowerCase()}`;
            }
        });

        // Write data
        const metadata = {
            ...dataMap[artistDirName],
            image_url: `${IPFS_TEMP_DIR}/${image}`,
        };
        const text = JSON.stringify(metadata, null, 4);

        fs.writeFileSync(
            path.join(
                __dirname,
                'artists',
                'dist',
                'metadata',
                'chain',
                metadata.tokenId
            ),
            text
        );

        siteMetadata.push(metadata);
    });

    fs.writeFileSync(
        path.join(dist, 'metadata', 'site', 'data.js'),
        `export const data = ${JSON.stringify(siteMetadata, null, 4)}`
    );

    convertFFMPEG(ffmpegConversions);
};

module.exports = {
    artists,
};
