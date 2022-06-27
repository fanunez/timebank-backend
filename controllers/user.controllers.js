// npm packages
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
// models
const { User } = require('../models');

// Mostrar Usuarios
const getUser = async( req = request, res = response ) => {
    
    const { since = 0 } = req.query;

    const query = { state: true };

    const [ total, usersComunidad ] = await Promise.all([
        User.countDocuments( query ),
        User.find( query )
            .skip( Number(since) )
    ]);

    res.json({
        total,
        usersComunidad
    });

}

// Obtener producto mediante id
const getUserById = async( req, res = response ) => {

    const { id } = req.params;
    const user = await User.findById( id );
    res.json({
        user 
    });

}

// Crear Usuario
const postUser = async( req = request, res = response ) => {

    // const body = req.body;
    const { name, surname, relation, age, address, phone, rut, email, description, password, type_user, state } = req.body;
    const date = Date.now();
    const newUser = new User({ name, surname, relation, age, address, phone, rut, email, description, password, type_user, date, state });
    // Encriptar password
    const salt = bcryptjs.genSaltSync(); // Número de vueltas para dificultar descifrado
    newUser.password = bcryptjs.hashSync( password, salt ); // hashing
    // Guardar en db y esperar guardado
    await newUser.save();
    res.json( newUser );

}

// Actualizar Usuario
const putUser = async( req, res ) => {
    
    const { id } = req.params;
    const { _id, password, email, ...remainder } = req.body;
    // Encriptar password
    if( password ) {
       const salt = bcryptjs.genSaltSync(); //Numero de vueltas para dificultar descifrado
       remainder.password = bcryptjs.hashSync( password, salt ); // hashing
    }
    const newUser = await User.findByIdAndUpdate( id, remainder );
    res.json( newUser );

}

// Eliminar Usuario
const deleteUser = async( req, res ) => {

    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { state: false } );
    const userAuth = req.userAuth;
    
    res.json({
        user, 
        userAuth
    });
}

// Asignar bonos
const balanceAsignator = async( req, res ) => {
    const { id } = req.params;
    const { balance } = req.body;
    User.findByIdAndUpdate( id, {balance: balance} );
    res.json( newUser );
}

module.exports = {
    getUser,
    getUserById,
    postUser,
    putUser,
    deleteUser,
    balanceAsignator
}