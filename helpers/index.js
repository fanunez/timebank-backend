const dbValidator = require('./db-validators');
const generateJWT = require('./jwt-generator');


module.exports = {
    ...dbValidator,
    ...generateJWT
}