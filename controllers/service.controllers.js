// npm packages
const { request, response } = require('express');
var mongoose = require('mongoose');
// models
const { Service } = require('../models');

// Show all Services with state true (actives)
const getService = async( req = request, res = response ) => {
    const query = { state: true};
    const [ total, services ] = await Promise.all([
        Service.countDocuments( query ),
        Service.find( query )
    ]);
    res.json({
        total,
        services
    });
}

// Get Service by id
const getServiceById = async( req, res = response ) => {
    const { id } = req.params;
    const service = await Service.findById( id );
    res.json( service );
}

// Create Service
const postService = async( req = request, res = response ) => {
    const { title, id_category, description, value, id_owner, achievements, state } = req.body;
    const date = Date.now();
    const newService = new Service({ title, id_category, description, value, id_owner, achievements, date, state});
    await newService.save();
    res.json( newService );
}

// Update Service
const putService = async( req, res) => {
    const { id } = req.params;
    const { _id, ...remainder } = req.body;
    const newService = await Service.findByIdAndUpdate( id, remainder );
    res.json( newService );
}

// Delete Servicio
const deleteService = async(req, res) => {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate( id, { state: false } );
    res.json( service );
}

// Search Services by user
const serviceUserFinder = async( req = request , res = response ) => {
    const { id } = req.params;
    const objectId = mongoose.Types.ObjectId( id );
    const userServices = await Service.find({id_owner: objectId, state: true});
    res.json( userServices );
}

// Search services by owner
const serviceSearcherUserFilteredbyName = async( req = request , res = response ) => {
    const { id, title } = req.params;
    const objectId = mongoose.Types.ObjectId( id );
    const userServices = await Service.find({id_owner: objectId, state: true});
    let Arr = [];
    const upperTitle = title.toUpperCase();
    userServices.filter( ( element ) => {
        const upperElementTitle = element.title.toUpperCase();
        if(upperElementTitle.includes(upperTitle)){
            Arr.push(element);
        } 
    })
    res.json( Arr );
}

// Search services by category
const categoryFinder = async( req = request , res = response ) => {
    const { id_category } = req.params;
    const objectId = mongoose.Types.ObjectId( id_category );
    const userServices = await Service.find({id_category: objectId, state: true});
    res.json( userServices );
}

// Search services by title
const getServicesByTitle = async( req = request , res = response ) => {
    const { title } = req.params;
    if( title ){
        const services = await Service.find({title:{$regex:'.*'+title+'.*',$options:"i"}, state: true});
        res.json( services );
    } else {
        const services = await Service.find({})
        res.json( services );
    }
}

// Show last services
const getLastServices = async( req = request , res = response ) => {
    const services = await Service.find({state: true}).sort({date: -1});
    res.json(services);
}

// Show popular services
const getPopularServices = async( req = request, res = response ) => {
    const services = await Service.find({state: true}).sort({request_counter: -1}).limit(5);
    res.json(services);
}

module.exports = {
    getService,
    getServiceById,
    postService,
    putService,
    deleteService,
    serviceUserFinder,
    serviceSearcherUserFilteredbyName,
    categoryFinder,
    getServicesByTitle,
    getLastServices,
    getPopularServices
}