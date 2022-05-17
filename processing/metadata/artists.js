const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const camelCase = require('camelcase');
const { execSync } = require('child_process');
const sharp = require('sharp');

const IPFS_TEMP_DIR = 'ipfs://QmdLL1tdkmoGhKTePY6H9GhsGeqeCHQskBcWkoqjsaVUKe';
const DO_NOT_INCLUDE_TRAIT_TYPES = [
    'tokenId',
    'camelCase',
    'Wallet',
    'Name',
    'Description',
    'Charity',
];

const convertFFMPEG = (conversions) => {
    for (const [cmd, conversion] of conversions) {
        try {
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
                ].filter(
                    (attr) =>
                        !DO_NOT_INCLUDE_TRAIT_TYPES.includes(attr.trait_type) &&
                        attr.value !== ''
                ),
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
    fs.mkdirSync(path.join(dist, 'images', 'chain'));
    fs.mkdirSync(path.join(dist, 'images', 'site'));
    fs.mkdirSync(path.join(dist, 'metadata'));
    fs.mkdirSync(path.join(dist, 'metadata', 'chain'));
    fs.mkdirSync(path.join(dist, 'metadata', 'chain', 'still'));
    fs.mkdirSync(path.join(dist, 'metadata', 'chain', 'animated'));
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
        let key;

        assetDir.map(async (asset) => {
            const [fileName, extName] = asset.split('.');

            if (
                extName.toLowerCase() === 'jpg' ||
                extName.toLowerCase() === 'jpeg'
            ) {
                key = camelCase(fileName);

                const originPath = path.join(
                    __dirname,
                    'artists',
                    'raw',
                    artistDirName,
                    'assets',
                    asset
                );

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
                        'chain',
                        `${camelCase(fileName)}.jpeg`
                    )
                );

                await sharp(originPath).toFile(
                    path.join(
                        __dirname,
                        'artists',
                        'dist',
                        'images',
                        'site',
                        `${camelCase(fileName)}.webp`
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

                const resize = `ffmpeg -i "${source}" -vf scale=400:-2 ${path.join(
                    __dirname,
                    'artists',
                    'dist',
                    'images',
                    'site',
                    `${camelCase(fileName)}.mp4`
                )}`;

                ffmpegConversions.push([resize, () => execSync(resize)]);

                if (extName.toLocaleLowerCase() === 'mp4') {
                    fs.cpSync(
                        source,
                        path.join(
                            __dirname,
                            'artists',
                            'dist',
                            'images',
                            'chain',
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
                        'images',
                        'chain',
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
            key,
        };

        const {
            image_url,
            description,
            name,
            attributes,
            animation_url,
            ...rest
        } = metadata;

        const still = JSON.stringify(
            {
                image_url: `${IPFS_TEMP_DIR}/${image}`,
                description,
                name,
                attributes,
                animation_url,
            },
            null,
            4
        );

        const animated = JSON.stringify(
            {
                animation_url: `${IPFS_TEMP_DIR}/${video}`,
                description,
                name,
                attributes,
            },
            null,
            4
        );

        fs.writeFileSync(
            path.join(
                __dirname,
                'artists',
                'dist',
                'metadata',
                'chain',
                'still',
                metadata.tokenId
            ),
            still
        );

        fs.writeFileSync(
            path.join(
                __dirname,
                'artists',
                'dist',
                'metadata',
                'chain',
                'animated',
                metadata.tokenId
            ),
            animated
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
