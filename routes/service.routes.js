// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
} = require('../middlewares');
// Helpers
const { existCategoryById,
        existUserById,
        existAchievementById
} = require('../helpers/db-validators');
// Controllers
const { getService, 
        postService, 
        putService, 
        deleteService, 
        buscadorServicioUsuario, 
        buscadorServicioCategoria, 
        buscadorTitulo 
} = require('../controllers/service.controllers')
// Init router
const router = Router();

// Get all services
router.get('/',getService);

// Post new service
router.post('/', [
    check('title', 'El título es necesario').not().isEmpty(),
    // Check category param
    check('id_category', 'La categoría perteneciente es necesaria').not().isEmpty(),
    check('id_category', 'No es un ID válido').isMongoId(),
    check('id_category').custom( existCategoryById ),
    // Check description param
    check('description').not().isEmpty(),
    // Check value param
    check('value').exists().isNumeric(),
    // Check image param
    check('image').not().isEmpty(),

    // Agregar validador de ruta de imagen 

    // Check id_owner
    check('id_owner').not().isEmpty(),
    check('id_owner', 'No es un ID válido').isMongoId(),
    check('id_owner').custom( existUserById ),
    // Check achievements param
    check('achievements').not().isEmpty(),
    check('achievements.*', 'No es un ID válido').isMongoId(),
    check('achievements.*').custom( existAchievementById ),
    // Check status param
    check('state').exists().isBoolean(),
    fieldValidator
], postService);

// Update service
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], putService);

// Delete service
// in later versions add a validator so that only the ADMINISTRATOR USER can run this operation
router.delete('/:id', deleteService);

// Search services by USER 
router.get('/buscarUsuario/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], buscadorServicioUsuario);

// Search services by CATEGORY
router.get('/buscarCategoria/:id', [
    check('id_category', 'No es un ID válido').isMongoId(),
    check('id_category').custom( existUserById ),
    fieldValidator
], buscadorServicioCategoria);

// Search services by TITLE
router.post('/buscarTitulo', [
    check('title', 'El título es necesario').not().isEmpty(),
    fieldValidator
], buscadorTitulo);


module.exports = router;