const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth.controllers')
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/login', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidator
], login);

module.exports = router;