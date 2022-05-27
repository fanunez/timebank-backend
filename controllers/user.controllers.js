// npm packages
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
// models
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

    res.json({
        total,
        usersComunidad
    });

}

// Obtener producto mediante id
const getUserById = async( req, res = response ) => {

    const { id } = req.params;

    const user = await community_user.findById( id );
        
    res.json({
        user 
    });

}


// Crear Usuario
const postUser = async( req = request, res = response ) => {

    // const body = req.body;
    const { name, surname, relation, age, address, phone, rut, email, password, type_user, state } = req.body;
    const newUser = new community_user({ name, surname, relation, age, address, phone, rut, email, password, type_user, state });
    // Encriptar password
    const salt = bcryptjs.genSaltSync(); // Número de vueltas para dificultar descifrado
    newUser.password = bcryptjs.hashSync( password, salt ); // hashing
    // Guardar en db y esperar guardado
    await newUser.save();

    res.json( newUser );

}

// Actualizar Usuario
const putUser = async( req, res) => {

    const { id } = req.params;
    const { _id, password, email, ...remainder } = req.body;

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
    getUserById,
    postUser,
    putUser,
    deleteUser,
}