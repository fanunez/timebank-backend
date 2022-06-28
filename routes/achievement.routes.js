// npm modules
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
        validateJWT
} = require('../middlewares');
// Controllers
const { getAchievement,
        getAchievementById, 
        postAchievement, 
        putAchievement,
        deleteAchievement 
} = require('../controllers/achievement.controllers');
const { existAchievementById } = require('../helpers/db-validators');

const router = Router();

// Get all Achievements
router.get('/', getAchievement);

// Get Achievement by id
router.get('/:id',[
    check('id', 'El ID del logro es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existAchievementById),
    fieldValidator
], getAchievementById);

// Create Achievement
router.post('/', [
    check('name', 'El nombre de logro es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    fieldValidator
], postAchievement);

// Update Achievement
router.put('/:id', [
    check('id', 'El ID del logro es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existAchievementById ),
    check('name', 'El nombre de logro es obligatorio').not().isEmpty(),
    check('description', 'La descripción es obligatoria').not().isEmpty(),
    fieldValidator
], putAchievement);

// Delete Achievement
// in later versions add a validator so that only the ADMINISTRATOR USER can run this operation
router.delete('/:id', [
    validateJWT,
    check('id', 'El ID del Servicio es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existAchievementById ),
    // check('ROL').custom( isAdmin ) or check('ROL').isIn(['Admin'])
    fieldValidator
],  deleteAchievement);

module.exports = router;