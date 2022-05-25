const { Router } = require('express');

const { getService, postService, putService, deleteService, buscadorServicioUsuario, buscadorServicioCategoria } = require('../controllers/service.controllers')

const router = Router();

router.get('/',getService);
router.post('/',postService);
router.put('/:id',putService);
router.delete('/:id',deleteService);
router.get('/buscarUsuario',buscadorServicioUsuario);
router.get('/buscarCategoria',buscadorServicioCategoria);


module.exports = router;