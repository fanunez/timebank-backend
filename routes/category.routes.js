// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
} = require('../middlewares');
// Controllers
const { getCategory,
        getCategoryById, 
        postCategory, 
        buscador 
} = require('../controllers/category.controllers')

const router = Router();

router.get('/', getCategory);

router.get('/:id', getCategoryById);

router.get('/categoryBuscador/:name', buscador);

router.post('/', [
    check('name', 'El nombre de cateogria es obligatorio').not().isEmpty(),
    check('petition', 'El número de peticiones es obligatorio').not().isEmpty(),
    check('petition', 'La petición debe ser un número').isNumeric(),
    fieldValidator
], postCategory);

module.exports = router;