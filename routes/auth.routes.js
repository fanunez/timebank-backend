// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
        validateJWT 
} = require('../middlewares');
// Controllers
const { getUserLogged,
        login
} = require('../controllers/auth.controllers')

const router = Router();

// Get user logged
router.get('/user-logged', [
    validateJWT,
    fieldValidator
], getUserLogged )

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidator
], login);

module.exports = router;