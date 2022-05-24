// Obtain Router from express
const { Router } = require('express');
const { check } = require('express-validator');
// Middlewares
const { fieldValidator,
        validateJWT
} = require('../middlewares');
// Helpers
const { emailValidator,
} = require('../helpers/db-validators');
// Import controllers
const { getUser,
        postUser,
        putUser,
        deleteUser 
} = require('../controllers/user.controllers');

// Init router
const router = Router();

// Defining routes for User 
router.get('/', getUser );

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('surname', 'El apellido es obligatorio').not().isEmpty(),
    check('relation').isIn('1', '2', '3'),
    check('age').isNumeric().isLength({ min: 8, max: 120 }),
    check('password', 'La contraseña debe tener más de 6 carácteres').isLength({ min: 6, max: 15}),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom( emailValidator ),
    check('state').isBoolean()

],postUser );

// name, surname, relation, age, phone, rut, email, password, type_user, state

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    fieldValidator
],putUser );

router.delete('/', deleteUser );
 
module.exports = router;