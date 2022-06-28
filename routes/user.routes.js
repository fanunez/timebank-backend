// Obtain Router from express
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
        validateRUT,
        validateJWT,
} = require('../middlewares');
// Helpers
const { emailValidator,
        existUserById
} = require('../helpers/db-validators');
// Import controllers
const { getUser,
        getUserById,
        postUser,
        putUser,
        deleteUser,
        balanceAsignator,
        getUserByNameSurname 
} = require('../controllers/user.controllers');
// Init router
const router = Router();

// Defining routes for User 
router.get('/', getUser );

// Get user by id
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], getUserById );

// Create new user
router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('surname', 'El apellido es obligatorio').not().isEmpty(),
    check('relation').isIn(['Estudio', 'Trabajo', 'Vivo']),
    check('age', 'La edad es obligatoria').not().isEmpty(),
    check('age').toFloat().isNumeric(),
    check('address').not().isEmpty(),
    check('phone', 'El numero de telefono es obligatorio').not().isEmpty(),
    check('phone').exists(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('rut').custom( validateRUT ),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailValidator ),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña debe tener más de 6 carácteres').isLength({ min: 6, max: 15 }),
    check('type_user', 'El tipo de usario es obligatorio').not().isEmpty(),
    check('type_user').isIn(['Blue', 'Orange', 'Admin']),
    fieldValidator
],postUser );

// Update user
router.put('/:id', [
    // storeInformation,
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('surname', 'El apellido es obligatorio').not().isEmpty(),
    check('relation').isIn(['Estudio', 'Trabajo', 'Vivo']),
    check('age', 'La edad es obligatoria').not().isEmpty(),
    check('age').toFloat().isNumeric(),
    check('address').not().isEmpty(),
    check('phone', 'El numero de telefono es obligatorio').not().isEmpty(),
    check('phone').exists(),
    check('rut', 'El rut es obligatorio').not().isEmpty(),
    check('rut').custom( validateRUT ),
    check('email', 'El correo es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailValidator ),
    check('type_user', 'El tipo de usario es obligatorio').not().isEmpty(),
    check('type_user').isIn(['Blue', 'Orange']),
    fieldValidator
],putUser );

// Delete user
// in later versions add a validator so that only the ADMINISTRATOR USER can run this operation
router.delete('/:id', [
    validateJWT,
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    fieldValidator
], deleteUser );

// Balance Asignator
router.put('/balance-asignator/:id', [
    check('id', 'El ID es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existUserById ),
    // Check balance param
    check('balance').not().isEmpty(),
    check('balance').exists().isNumeric(),
    fieldValidator
], balanceAsignator);

// Get User By Name and Surname 
router.get('/getUser/:name/:surname', getUserByNameSurname );

module.exports = router;