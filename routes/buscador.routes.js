const { Router } = require('express');
const { check } = require('express-validator');

const { buscador } = require('../controllers/buscador.controllers')
const { fieldValidator } = require('../middlewares/field-validator');

const router = Router();

router.post('/buscador', [
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    fieldValidator
],buscador);

module.exports = router;