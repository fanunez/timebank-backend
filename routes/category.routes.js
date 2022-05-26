const { Router } = require('express');

const { getCategory, postCategory, buscador  } = require('../controllers/category.controllers')

const router = Router();

router.get('/',getCategory);
router.get('/categoryBuscador',buscador);
router.post('/',postCategory);

module.exports = router;