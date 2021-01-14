const core = require('./src/core');
const getSuccessors = require('./src/getSuccessors');
const piece = require('./src/piece.js');
const validateSetup = require('./src/validateSetup');
module.exports = {
    ...core,
    ...getSuccessors,
    ...piece,
    validateSetup,
};
