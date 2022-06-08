// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator, 
        validateFile 
} = require('../middlewares');
// Controllers
const { updateImageCloudinary 
} = require('../controllers/upload-images.controller');
// Helpers
const { collectionAllowed
} = require('../helpers');

// Router init
const router = Router();

// Create new resource
router.put('/:collection/:id', [
    validateFile,
    check('id', 'No es ID valido').isMongoId(),
    check('collection').custom( c => collectionAllowed( c, ['users', 'service', 'category']) ),
    fieldValidator
], updateImageCloudinary );

module.exports = router;