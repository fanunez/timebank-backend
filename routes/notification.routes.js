// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
        validateJWT
} = require('../middlewares');
// Helpers
const { existNotificationById, existUserById } = require('../helpers/db-validators');
// Controllers
const { getNotification,
        postNotification,
        putNotification,
        deleteNotification
} = require('../controllers/notification.controllers')
// Init router
const router = Router();

// Get all notification
router.get('/', getNotification);

// Create new notification
router.post('/', [
    // Check id user aplicant
    check('id_user').not().isEmpty(),
    check('id_user', 'No es un ID válido').isMongoId(),
    check('id_user').custom( existUserById ),
    // Check id service
    check('description').not().isEmpty(),
    fieldValidator
], postNotification);

// Update notification
router.put('/:id', [
        // Check id user notification
        check('id').not().isEmpty(),
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom( existNotificationById ),
        // Check id user notification
        check('id_user').not().isEmpty(),
        check('id_user', 'No es un ID válido').isMongoId(),
        check('id_user').custom( existUserById ),
        // Check id service
        check('description').not().isEmpty(),
    fieldValidator
], putNotification);

// Delete notification
router.delete('/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existNotificationById ),
    fieldValidator
], deleteNotification);

module.exports = router;