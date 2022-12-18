const mlog = require('mocha-logger');

const logger = {
    info: mlog.log,
};
Object.freeze(logger);

module.exports = logger;