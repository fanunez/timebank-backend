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
        getCategoryByTitle,
        putCategory,
        deleteCategory
} = require('../controllers/category.controllers');
const { existCategoryById } = require('../helpers/db-validators');

const router = Router();

// Get all Categories
router.get('/', getCategory);

// Get Category by id
router.get('/:id',[
    check('id', 'El ID de cateogria es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existCategoryById ),
    fieldValidator
] , getCategoryById);

// Get Category by name
router.get('/search-by-title/:name', [
    check('name', 'El nombre a buscar es necesario').not().isEmpty(),
    fieldValidator
], getCategoryByTitle);

// Create Category
router.post('/', [
    check('name', 'El nombre de cateogria es obligatorio').not().isEmpty(),
    check('petition', 'El número de peticiones es obligatorio').not().isEmpty(),
    check('petition', 'La petición debe ser un número').isNumeric(),
    fieldValidator
], postCategory);

// Update Category
router.put('/:id', [
    check('id', 'El ID del logro es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existCategoryById ),
    check('name', 'El nombre de cateogria es obligatorio').not().isEmpty(),
    check('petition', 'El número de peticiones es obligatorio').not().isEmpty(),
    check('petition', 'La petición debe ser un número').isNumeric(),
    fieldValidator
], putCategory );

// Delete Category
// in later versions add a validator so that only the ADMINISTRATOR USER can run this operation
router.delete('/:id', [
    check('id', 'El ID del Servicio es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existCategoryById ),
    // check('ROL').custom( isAdmin ) or check('ROL').isIn(['Admin'])
    fieldValidator
],  deleteCategory );

module.exports = router;