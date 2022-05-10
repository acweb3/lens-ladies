const { artists } = require('./artists');

const metadata = async () => {
    artists();
};

module.exports = {
    metadata,
};
