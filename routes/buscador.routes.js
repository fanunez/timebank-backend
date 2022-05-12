const { Router } = require('express');
const { check } = require('express-validator');

const { buscador } = require('../controllers/buscador.controllers')

const router = Router();

router.post('/',buscador);

module.exports = router;