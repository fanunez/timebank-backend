// npm packages
const { request, response } = require('express');
//const bcryptjs = require('bcryptjs');

const community_user = require('../models/community_user');



// Mostrar Usuarios
const getUser = async( req = request, res = response ) => {
    
    const { limit = 5, since = 0 } = req.query;

    const query = { state: true};

    const [ total, usersComunidad ] = await Promise.all([
        community_user.countDocuments( query ),
        community_user.find( query )
            .skip( Number(since) )
            .limit( Number(limit) )
    ]);

    console.log(usersComunidad)

    res.json({
        total,
        usersComunidad
    });

}

// Crear Usuario
const postUser = async( req, res) => {

    // const body = req.body;
    const { nombre, apellido, relacion, edad, telefono, rut, correo, contraseña, tipoUsuario, state } = req.body;
    const newUser = new community_user({ nombre, apellido, relacion, edad, telefono, rut, correo, contraseña, tipoUsuario, state });

    // Encriptar password
    //const salt = bcryptjs.genSaltSync(); //Numero de vueltas para dificultar descifrado
    //userComunidad.contraseña = bcryptjs.hashSync( contraseña, salt ); // hashing

    // Guardar en db y esperar guardado
    await newUser.save();

    res.json( newUser );

}

// Actualizar Usuario
const putUser = async( req, res) => {

    const { id } = req.params;
    const { _id, contraseña, correo, ...remainder } = req.body;

    //if( contraseña ) {
        // Encriptar password
    //    const salt = bcryptjs.genSaltSync(); //Numero de vueltas para dificultar descifrado
    //    remainder.contraseña = bcryptjs.hashSync( contraseña, salt ); // hashing
    //}

    const newUser = await community_user.findByIdAndUpdate( id, remainder );

    res.json( newUser );

    res.json({
        msg: 'put API - from controller'
    })
}

// Eliminar Usuario
const deleteUser = async(req, res) => {

    const { id } = req.params;
    
    const user = await community_user.findByIdAndUpdate( id, { state: false } );
    const userAuth = req.userAuth;
    
    res.json({
        user, 
        userAuth
    });

    res.json({
        msg: 'delete API - from controller'
    })
}


module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
}