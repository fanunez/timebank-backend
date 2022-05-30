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

// Login de usuario
const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await User.findOne({ email });
        if( !user ) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos - email'
            })
        }
        // Si el usuario esta activo
        if( !user.state ) {
            return res.status(400).json({
                msg: 'Usuario inactivo - state: false'
            })
        }
        // Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        const user_pass = await User.findOne({ validPassword });
        if( !user_pass ) {
            return res.status(400).json({
                msg: 'Email / Password no son correctos - password'
            })
        }

        // Generar JWT
        const token = await generateJWT( user.id );

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