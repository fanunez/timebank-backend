// npm packages
const { request, response } = require('express');
// models
const { Notification } = require('../models');

// Show all Notifications with state true (actives)
const getNotification = async( _req = request, res = response ) => {
    const query = { state: true};
    const [ total, notificacion ] = await Promise.all([
        Notification.countDocuments( query ),
        Notification.find( query )
    ]);
    res.json({
        total,
        notificacion
    });
}

// Get Notification by id
const getNotificationById = async( req, res = response ) => {
    const { id } = req.params;
    const notification = await Notification.findById( id );
    res.json( notification );
}

// Create Notification
const postNotification = async( req = request, res = response ) => {
    const { id_user, id_service, description} = req.body;
    const date = Date.now();
    const newNotification = new Notification({ id_user, id_service, description, date});
    await newNotification.save();
    res.json( newNotification );
}

// Update Notification
const putNotification = async( req, res) => {
    const { id } = req.params;
    const { _id, ...remainder } = req.body;
    const newNotification = await Notification.findByIdAndUpdate( id, remainder );
    res.json( newNotification );
}

// Delete Notification
const deleteNotification = async(req, res) => {
    const { id } = req.params;
    const notificacion = await Notification.findByIdAndUpdate( id, { state: false } );
    res.json( notificacion );
}

// Get User Notifications
const getUserNotification = async(req, res) => {
    const { id } = req.params;
    const notifications = await Notification.find({id_user: id, state: true});
    res.json( notifications );
}

module.exports = {
    getNotification,
    getNotificationById,
    postNotification,
    putNotification,
    deleteNotification,
    getUserNotification
}
