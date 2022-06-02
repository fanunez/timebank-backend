// npm modules
const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { fieldValidator,
} = require('../middlewares');

// Controllers
const { getAchievement,
        getAchievementById, 
        postAchievement, 
        putAchievement,
        deleteAchievement 
} = require('../controllers/achievement.controllers')

const router = Router();

router.get('/', getAchievement);

router.get('/:id', getAchievementById);

router.post('/', [
    check('name', 'El nombre de logro es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('state', 'El estado debe ser obligarotio').not().isEmpty(),
    check('state', 'El estado debe ser booleano').isBoolean(),
    fieldValidator
], postAchievement);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    //check('id').custom( existUserById ),
    check('name', 'El nombre de logro es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    check('state', 'El estado debe ser obligarotio').not().isEmpty(),
    check('state', 'El estado debe ser booleano').isBoolean(),
    fieldValidator
], putAchievement);

router.delete('/:id', deleteAchievement);

module.exports = router;