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
        getServiceById, 
        postService, 
        putService, 
        deleteService, 
        serviceUserFinder,
        serviceSearcherUserFilteredbyName, 
        categoryFinder, 
        getServicesByTitle,
        getServiceTimesnap,
        getPopularServices
} = require('../controllers/service.controllers')
// Init router
const router = Router();

// Get all services
router.get('/',getService);

// Get by Id
router.get('/:id',[
    check('id', 'El ID de servicio es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existServiceById ),
    fieldValidator  
] , getServiceById);

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
router.get('/service-user-finder/:id', [
    check('id', 'El ID del Usuario es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], serviceUserFinder);

// Search services by USER filtrado
router.get('/service-user-finder/:id/:title', [
    check('id', 'El ID del Usuario es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    check('title', 'La palabra es obligatoria').not().isEmpty(),
    fieldValidator
], serviceSearcherUserFilteredbyName);


// Search services by CATEGORY
router.get('/category-finder/:id_category', [
    check('id_category', 'El ID de la Categoria es obligatorio').not().isEmpty(),
    check('id_category', 'No es un ID válido').isMongoId(),
    check('id_category').custom( existCategoryById ),
    fieldValidator
], categoryFinder);

// Search services by TITLE
router.get('/get-service/:title', [
    check('title', 'El título es necesario').not().isEmpty(),
    fieldValidator
], getServicesByTitle);

// Search Service Timesnap
router.get('/service-timesnap/:id', [
    check('id', 'El ID del servicio es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existServiceById ),
    fieldValidator
], getServiceTimesnap);

// Get all services
router.get('/popular-services/getAll', getPopularServices);

module.exports = router;