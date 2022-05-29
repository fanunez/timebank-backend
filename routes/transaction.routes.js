const { Router } = require('express');

const { getTransaction, postTransaction, putTransaction, deleteTransaction, ownRequestTransaction,
    ServiceRequestTransaction } = require('../controllers/transaction.controllers')

const router = Router();

router.get('/',getTransaction);
router.post('/',postTransaction);
router.put('/:id',putTransaction);
router.delete('/:id',deleteTransaction);
router.get('/own_request/:id',ownRequestTransaction);
router.get('/owner_requests/:id',ServiceRequestTransaction);

module.exports = router;