// npm packages
const { request, response } = require('express');
// models
const { Transaction, Service, User } = require('../models');
var mongoose = require('mongoose');

// Mostrar Transacciones
const getTransaction = async( req = request, res = response ) => {

    const query = { state: true };

    const [ total, transactions ] = await Promise.all([
        Transaction.countDocuments( query ),
        Transaction.find( query )
    ]);

    res.json({
        total,
        transactions
    });

}

// Crear Transaccion
const postTransaction = async( req = request, res = response ) => {

    const { id_user_aplicant, id_user_owner, id_service, state_request, state } = req.body;

    const user = await User.findById( id_user_aplicant );
    const service = await Service.findById( id_service );

    const userServices = await Transaction.find({id_user_aplicant: id_user_aplicant,
         id_user_owner: id_user_owner, id_service: id_service , state: true});
       
    if(userServices.length != 0){
        return res.json('Ya se postulo a este servicio');
    }     

    if(user.balance < service.value){
        return res.json('No tiene suficientes bonos de tiempo');

    }

    // Service Postulation Case
    if(user.balance >= service.value){

        const newBalance = user.balance - service.value;
        await User.findByIdAndUpdate( id_user_aplicant, {balance: newBalance});

        const date = Date.now();
        const newTransaction = new Transaction({ id_user_aplicant, id_user_owner, id_service, date, state_request, state });
        await newTransaction.save();

        res.json( newTransaction );


    }
}

// Actualizar Transaccion
const putTransaction = async( req, res) => {
    const { id } = req.params;
    const { _id, ...remainder } = req.body;
    const newTransaction = await Transaction.findByIdAndUpdate( id, remainder );
    res.json( newTransaction );
}

// Eliminar Transaccion
const deleteTransaction = async(req, res) => {

    const { id } = req.params;
    
    const transaction = await Transaction.findByIdAndUpdate( id, { state: false } );
    
    res.json({
        transaction, 
    });

}

// Vista Mis solicitudes (por usuario ID del aplicante) 
const ownRequestTransaction = async(req, res) => {
    const { id } = req.params;
    const objectId = mongoose.Types.ObjectId(id);
    const transactions = await Transaction.find({id_user_aplicant: objectId, state_request: 1, state: true});

    let servicesByTransaction = [];

    for( const transaction of transactions ) {
        const id = transaction.id_service;
        const service = await Service.findById( id );
        const payload = {
            title: service.title,
            uid_owner: transaction.id_user_owner,
            date: transaction.date,
        }
        servicesByTransaction.push( payload );
    }

    res.json( servicesByTransaction );
}

// Vista Solicitudes enviadas a mis servicios (por usuario ID del dueño)
const serviceRequestTransaction = async(req, res) => {
    const { id } = req.params;
    const objectId = mongoose.Types.ObjectId(id);
    const serviceTransactions = await Transaction.find({id_user_owner: objectId, state_request: 1, state: true});
    res.json( serviceTransactions );
}


module.exports = {
    getTransaction,
    postTransaction,
    putTransaction,
    deleteTransaction,
    ownRequestTransaction,
    serviceRequestTransaction
}