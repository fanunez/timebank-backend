const { Router } = require('express');

const { getService, postService, putService, deleteService } = require('../controllers/service.controllers')

const router = Router();

router.get('/',getService);
router.post('/',postService);
router.put('/:id',putService);
router.delete('/:id',deleteService);

module.exports = router;