const { art } = require('./art');
const { metadata } = require('./metadata');

(async () => {
    await metadata();
    // await art();
})();
