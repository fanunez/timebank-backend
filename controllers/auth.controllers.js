// npm packages
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
// models 
const { User } = require('../models');
// our modules
const generateJWT = require('../helpers/jwt-generator');

// Get uid from user logged ( with a valid JWT )
const getUserLogged = ( req = request, res = response ) => {
    
    const userAuth = req.userAuth;
    res.json( userAuth );

}

// Login User
const login = async( req, res = response ) => {
    // require email and pass params
    const { email, password } = req.body;

    try {
        // Verify if email exists
        const user = await User.findOne({ email });
        if( !user ) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos - email'
            })
        }
        // User is active?
        if( !user.state ) {
            return res.status(400).json({
                msg: 'Usuario inactivo - state: false'
            })
        }
        // Verify password
        const validPassword = bcryptjs.compareSync( password, user.password );
        const user_pass = await User.findOne({ validPassword });
        if( !user_pass ) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos - password'
            })
        }
        // Generate JWT
        const token = await generateJWT( user.id );
        // Return user logged and JWT token
        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Algo salio mal :('
        })
    }

}

module.exports = {
    getUserLogged,
    login,
}