// Obtain Router from express
const { Router } = require('express');
// Import controllers
const { getUser,
        postUser,
        putUser,
        patchUser,
        deleteUser 
} = require('../controllers/user.controllers');
// Init router
const router = Router();

// Defining routes for User 
router.get('/', getUser );

router.post('/', postUser );

router.put('/', putUser );

router.patch('/', patchUser );

router.delete('/', deleteUser );
 

module.exports = router;