// npm packages
const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
// models
const { User } = require('../models');
const trim = require('trim')

// Show all Users with state true (actives)
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

// Get User by id
const getUserById = async( req, res = response ) => {
    const { id } = req.params;
    const user = await User.findById( id );
    res.json({
        user 
    });
}

// Create User
const postUser = async( req = request, res = response ) => {
    const { name, surname, relation, age, address, phone, rut, email, description, password, type_user, state } = req.body;
    const date = Date.now();
    const newUser = new User({ name, surname, relation, age, address, phone, rut, email, description, password, type_user, date, state });
    // Encrypt password
    const salt = bcryptjs.genSaltSync(); // Number of turns to make decryption difficult
    newUser.password = bcryptjs.hashSync( password, salt ); // Hashing
    await newUser.save();
    res.json( newUser );

}

// Update User
const putUser = async( req, res ) => {
    const { id } = req.params;
    const { _id, password, email, rut, age, balance, type_user, ...remainder } = req.body;
    // Encrypt password
    if( password ) {
       const salt = bcryptjs.genSaltSync(); // Number of turns to make decryption difficult
       remainder.password = bcryptjs.hashSync( password, salt ); // Hashing
    }
    const newUser = await User.findByIdAndUpdate( id, remainder );
    res.json( newUser );

}

// Delete User
const deleteUser = async( req, res ) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate( id, { state: false } );
    const userAuth = req.userAuth;
    res.json({
        user, 
        userAuth
    });
}

// Assign balance
const balanceAsignator = async( req = request , res = response ) => {
    const { id } = req.params;
    const { balance } = req.body;
    const user = await User.findByIdAndUpdate( id, {balance: balance});
    res.json( user );
}

// User Finder by Name & Surname
const getUserByNameSurname = async( req = request , res = response ) => {
    let { name, surname } = req.body;
    
    name = trim(name);
    surname = trim(surname);

    let users;
    // Case 1 
    if(name != "" && surname != ""){
        users = await User.find({
            name:{$regex:'.*'+name+'.*',$options:"i"},
            surname:{$regex:'.*'+surname+'.*',$options:"i"}, 
            state: true
        });
    }
    // Case 2
    else if(name != "" && surname == ""){
        users = await User.find({
            name:{$regex:'.*'+name+'.*',$options:"i"}, 
            state: true
        });
    }
    // Case 3
    else if(name == "" && surname != ""){
        users = await User.find({
            surname:{$regex:'.*'+surname+'.*',$options:"i"}, 
            state: true
        });
    }
    // Case 4
    else if(name == "" && surname == ""){
        users = await User.find({
            state: true
        });
    }

    res.json( users );
}

// Get Quantity of Orange and Blue Users
const getQuantityOfUser = async( req = request, res = response ) => {
    
    const BlueQuantity = await User.find( {type_user : "Blue" , state: true} ).countDocuments();
    const OrangeQuantity = await User.find( {type_user : "Orange", state: true} ).countDocuments();
    
    res.json({
        BlueQuantity: BlueQuantity ,
        OrangeQuantity: OrangeQuantity
    });
}

module.exports = {
    getUser,
    getUserById,
    postUser,
    putUser,
    deleteUser,
    balanceAsignator,
    getUserByNameSurname,
    getQuantityOfUser
}