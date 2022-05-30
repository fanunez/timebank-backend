// npm packages
const { request, response } = require('express');
var mongoose = require('mongoose');

// models
const { Service } = require('../models');

// Mostrar Servicios
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

// Crear Servicios
const postService = async( req = request, res = response ) => {
    const { title, id_category, description, value, image, id_owner, achievements, state } = req.body;
    const newService = new Service({ title, id_category, description, value, image, id_owner, achievements, state });
    // Guardar en db y esperar guardado
    await newService.save();

    res.json( newService );

}

// Actualizar Servicios
const putService = async( req, res) => {

    const { id } = req.params;
    const { _id, ...remainder } = req.body;

    const newService = await Service.findByIdAndUpdate( id, remainder );

    res.json( newService );

}

// Eliminar Servicio
const deleteService = async(req, res) => {
    const { id } = req.params;
    const service = await Service.findByIdAndUpdate( id, { state: false } );
    
    res.json({
        service, 
    });

}

// Buscar los servicios de un usuario
const buscadorServicioUsuario = async( req = request , res = response ) => {
    const { id } = req.params;
    const objectId = mongoose.Types.ObjectId(id);
    const serviciosUser = await Service.find({id_owner: objectId});
    res.json( serviciosUser );
}

// Buscar los servicios en base a una categoria
const buscadorServicioCategoria = async( req = request , res = response ) => {
    const { id_category } = req.params;
    const objectId = mongoose.Types.ObjectId(id_category);
    const serviciosUser = await Service.find({id_category: objectId});
    res.json( serviciosUser );
}

// Buscador de servicio por titulo
const buscadorTitulo = async( req = request , res = response ) => {

    const { title } = req.body;
    if(title){
        const servicios = await Service.find({title:{$regex:'.*'+title+'.*',$options:"i"}});
        res.json( servicios );
    }else{
        const servicios = await Service.find({})
        res.json( servicios );
    }

}


module.exports = {
    getService,
    postService,
    putService,
    deleteService,
    buscadorServicioUsuario,
    buscadorServicioCategoria,
    buscadorTitulo
}