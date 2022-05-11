const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth')
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/login', [
    check('correo', 'El email es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').not().isEmpty(),
    fieldValidator
],login);

module.exports = router;