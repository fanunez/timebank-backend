// npm packages
const { request, response } = require('express');
// models
const { Transaction, Service, User, Notification } = require('../models');
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

        // Notification
        const id_user = id_user_owner;
        const name = user.name;
        const surname = user.surname;
        const title = service.title;
        const description = "El usuario " + name + " " + surname + " ha solicitado tu servicio de " + title;
        const newNotification = new Notification({ id_user, id_service, description, date});
        await newNotification.save();

        res.json( newTransaction );

    }
}


// Aceptar Transaccion
const acceptTransaction = async( req = request, res = response ) => {
    const { id_transaction } = req.body;

    const transaction = await Transaction.findById( id_transaction );
    const id_service = transaction.id_service;

    const service = await Service.findById( id_service );
    const request_counter = service.request_counter;
    const new_request_counter = request_counter + 1;

    await Service.findByIdAndUpdate( id_service, {request_counter: new_request_counter});
    await Transaction.findByIdAndUpdate( id_transaction, {state_request: 2});

    // Notification
    const id_user = transaction.id_user_aplicant;
    const service_name = service.title;
    const description = "Tu solicitud del servicio " + service_name + " ha sido aceptada";
    const date = Date.now();
    const newNotification = new Notification({ id_user, id_service, description, date});
    await newNotification.save();


    res.json("La transaccion fue aceptada")
}

// Rechazar Transaccion
const rejectTransaction = async( req = request, res = response ) => {
    
    const {id_transaction} = req.body;

    const transaction = await Transaction.findById( id_transaction );

    const id_user_aplicant = transaction.id_user_aplicant;
    const id_service = transaction.id_service;

    const user = await User.findById( id_user_aplicant );
    const service = await Service.findById( id_service );

    const newBalance = user.balance + service.value;

    await User.findByIdAndUpdate( id_user_aplicant, {balance: newBalance});
    await Transaction.findByIdAndUpdate( id_transaction, {state_request: 0});

    // Notification
    const id_user = transaction.id_user_aplicant;
    const service_name = service.title;
    const description = "Tu solicitud del servicio " + service_name + " ha sido rechazada";
    const date = Date.now();
    const newNotification = new Notification({ id_user, id_service, description, date});
    await newNotification.save();

    res.json("La transaccion fue rechazada")
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
    
    let servicesByTransactionO = [];

    for( const transaction of serviceTransactions ) {
        const id = transaction.id_service;
        const service = await Service.findById( id );
        const payload = {
            title: service.title,
            id_service: transaction.id_service,
            uid_aplicant: transaction.id_user_aplicant,
            date: transaction.date,
        }
        servicesByTransactionO.push( payload );
    }
    res.json( servicesByTransactionO );
}

// Get By User
const getByUser = async(req, res) => {

    const { id } = req.params;

    const transactions = await Transaction.find({
        $or: [
          { id_user_aplicant: id, state: true },
          { id_user_owner: id, state: true }
        ]
    });

    res.json(transactions)

}


module.exports = {
    getTransaction,
    postTransaction,
    putTransaction,
    deleteTransaction,
    ownRequestTransaction,
    serviceRequestTransaction,
    acceptTransaction,
    rejectTransaction,
    getByUser
}