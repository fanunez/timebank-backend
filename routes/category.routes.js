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
        getCategoryByTitle 
} = require('../controllers/category.controllers');
const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

router.get('/', getCategory);

router.get('/:id',[
    check('id', 'El ID de cateogria es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existCategoryById ),
    fieldValidator
] , getCategoryById);

router.get('/search-by-title/:name', [
    check('name', 'El nombre a buscar es necesario').not().isEmpty(),
    fieldValidator
], getCategoryByTitle);

router.post('/', [
    check('name', 'El nombre de cateogria es obligatorio').not().isEmpty(),
    check('petition', 'El número de peticiones es obligatorio').not().isEmpty(),
    check('petition', 'La petición debe ser un número').isNumeric(),
    fieldValidator
], postCategory);

module.exports = router;