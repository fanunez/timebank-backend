// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
        validateJWT
} = require('../middlewares');
// Helpers
const { existNotificationById, 
    existUserById,
    existServiceById } = require('../helpers/db-validators');
// Controllers
const { getNotification,
        postNotification,
        putNotification,
        deleteNotification,
        getUserNotification
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
    check('id_service').not().isEmpty(),
    check('id_service', 'No es un ID válido').isMongoId(),
    check('id_service').custom( existServiceById ),
    // Check description
    check('description').not().isEmpty(),
    fieldValidator
], postNotification);

// Update notification
router.put('/:id', [
    // Check id user notification
    check('id').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existNotificationById ),
    check('check').isIn([0, 1]),
    fieldValidator
], putNotification);

// Delete notification
// in later versions add a validator so that only the ADMINISTRATOR USER can run this operation
router.delete('/:id', [
    validateJWT,
    check('id').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existNotificationById ),
    fieldValidator
], deleteNotification);

// Get Notifications By User
router.get('/user-notifications/:id', [
    check('id').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], getUserNotification);

module.exports = router;