// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
} = require('../middlewares');
// Helpers
const { existUserById,
        existServiceById
} = require('../helpers/db-validators');
// Controllers
const { getTransaction,
        postTransaction,
        putTransaction,
        deleteTransaction,
        ownRequestTransaction,
        ServiceRequestTransaction 
} = require('../controllers/transaction.controllers')
// Init router
const router = Router();

// Get all transactions
router.get('/', getTransaction);

// Create new transaction
router.post('/', [
    // Check id user aplicant
    check('id_user_aplicant').not().isEmpty(),
    check('id_user_aplicant', 'No es un ID válido').isMongoId(),
    check('id_user_aplicant').custom( existUserById ),
    // Check id user owner
    check('id_user_owner').not().isEmpty(),
    check('id_user_owener', 'No es un ID válido').isMongoId(),
    check('id_user_owener').custom( existUserById ),
    // Check id service
    check('id_service').not().isEmpty(),
    check('id_service').custom( existServiceById ),
    // Check state request
    check('state_request').exists().isNumeric(),
    // Check status param
    check('state').exists().isBoolean(),
    fieldValidator
], postTransaction);

// Update transaction
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], putTransaction);

// Delete transaction
router.delete('/:id', deleteTransaction);

// Get transaction by OWNER
router.get('/own_request/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], ownRequestTransaction);

// Get transaction by APLICANT
router.get('/owner_requests/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], ServiceRequestTransaction);

module.exports = router;