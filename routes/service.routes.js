// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
        validateJWT
} = require('../middlewares');
// Helpers
const { existCategoryById,
        existUserById,
        existServiceById,
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
    check('value').not().isEmpty(),
    check('value').exists().isNumeric(),
    // Check id_owner
    check('id_owner').not().isEmpty(),
    check('id_owner', 'No es un ID válido').isMongoId(),
    check('id_owner').custom( existUserById ),
    // Check Achievements
    check('achievements', 'Los logros son obligatorio').not().isEmpty(),
    check('achievements', 'No es un ID válido').isMongoId(),
    // Check status param
    check('state').exists().isBoolean(),
    fieldValidator
], postService);

// Update service
router.put('/:id', [
    check('id', 'El ID del Servicio es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existServiceById ),
    check('id_category', 'La categoría perteneciente es necesaria').not().isEmpty(),
    check('id_category', 'No es un ID válido').isMongoId(),
    check('id_category').custom( existCategoryById ),
    // Check description param
    check('description').not().isEmpty(),
    // Check value param
    check('value').not().isEmpty(),
    check('value').exists().isNumeric(),
    // Check id_owner
    check('id_owner').not().isEmpty(),
    check('id_owner', 'No es un ID válido').isMongoId(),
    check('id_owner').custom( existUserById ),
    // Check Achievements
    check('achievements', 'Los logros son obligatorio').not().isEmpty(),
    check('achievements', 'No es un ID válido').isMongoId(),
    // Check status param
    check('state').exists().isBoolean(),
    fieldValidator
], putService);

// Delete service
// in later versions add a validator so that only the ADMINISTRATOR USER can run this operation
router.delete('/:id', [
    validateJWT,
    check('id', 'El ID del Servicio es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existServiceById ),
    // check('ROL').custom( isAdmin ) or check('ROL').isIn(['Admin'])
    fieldValidator
], deleteService);

// Search services by USER 
router.get('/buscarUsuario/:id', [
    check('id', 'El ID del Usuario es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], buscadorServicioUsuario);

// Search services by CATEGORY
router.get('/buscarCategoria/:id_category', [
    check('id_category', 'El ID de la Categoria es obligatorio').not().isEmpty(),
    check('id_category', 'No es un ID válido').isMongoId(),
    check('id_category').custom( existCategoryById ),
    fieldValidator
], buscadorServicioCategoria);

// Search services by TITLE
router.get('/buscarTitulo/:title', [
    check('title', 'El título es necesario').not().isEmpty(),
    fieldValidator
], buscadorTitulo);


module.exports = router;