// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
        validateJWT
} = require('../middlewares');
// Helpers
const { existUserById,
        existServiceById,
        existTransactionById
} = require('../helpers/db-validators');
// Controllers
const { getTransaction,
        postTransaction,
        putTransaction,
        deleteTransaction,
        ownRequestTransaction,
        serviceRequestTransaction,
        acceptTransaction,
        rejectTransaction,
        getByUser 
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
    check('id_user_owner', 'No es un ID válido').isMongoId(),
    check('id_user_owner').custom( existUserById ),
    // Check id service
    check('id_service').not().isEmpty(),
    check('id_service').custom( existServiceById ),
    // Check state request
    check('state_request', 'El Estado de transaccion es obligatorio').not().isEmpty(),
    check('state_request').exists().isNumeric(),
    // Check status param
    check('state').exists().isBoolean(),
    fieldValidator
], postTransaction);

// Update transaction
router.put('/:id', [
    check('id', 'El ID de Transacción es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existTransactionById ),
    check('id_user_aplicant').not().isEmpty(),
    check('id_user_aplicant', 'No es un ID válido').isMongoId(),
    check('id_user_aplicant').custom( existUserById ),
    // Check id user owner
    check('id_user_owner').not().isEmpty(),
    check('id_user_owner', 'No es un ID válido').isMongoId(),
    check('id_user_owner').custom( existUserById ),
    // Check id service
    check('id_service').not().isEmpty(),
    check('id_service').custom( existServiceById ),
    // Check state request
    check('state_request', 'El Estado de transaccion es obligatorio').not().isEmpty(),
    check('state_request').exists().isNumeric(),
    // Check status param
    check('state').exists().isBoolean(),
    fieldValidator
], putTransaction);

// Delete transaction
// in later versions add a validator so that only the ADMINISTRATOR USER can run this operation
router.delete('/:id', [
    validateJWT,
    check('id', 'El ID de Transacción es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existTransactionById ),
    fieldValidator
], deleteTransaction);

// Get transaction by APLICANT
router.get('/own_request/:id', [
    check('id', 'El ID de Usuario es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], ownRequestTransaction);

// Get transaction by OWNER
router.get('/owner_requests/:id', [
    check('id', 'El ID de Usuario es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], serviceRequestTransaction);

// Accept Transaction
router.post('/accept_transaction', [
    check('id_transaction', 'El ID de Transaccion es obligatorio').not().isEmpty(),
    check('id_transaction', 'No es un ID válido').isMongoId(),
    check('id_transaction').custom( existTransactionById ),
    fieldValidator
], acceptTransaction);


// Reject Transaction
router.post('/reject_transaction', [
    check('id_transaction', 'El ID de Transaccion es obligatorio').not().isEmpty(),
    check('id_transaction', 'No es un ID válido').isMongoId(),
    check('id_transaction').custom( existTransactionById ),
    fieldValidator
], rejectTransaction);

// Get Transaction By User
router.get('/getByUser/:id', [
    check('id', 'El ID de Usuario es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], getByUser);

module.exports = router;