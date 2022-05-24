// npm packages
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
// models 
const community_user = require('../models/community_user');
// our modules
const generateJWT = require('../helpers/jwt-generator');

// Login de usuario
const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // Verificar si el email existe
        const user = await community_user.findOne({ email });
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
        const user_pass = await community_user.findOne({ validPassword });
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
    login
}