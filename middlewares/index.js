// If you point to the Middlewares folder, it will use index.js by default as the main file
const fieldValidator = require('../middlewares/field-validator.js');
const validateJWT = require('../middlewares/jwt-validator.js');

module.exports = {
    ...fieldValidator,
    ...validateJWT
}