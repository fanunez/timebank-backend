// npm packages
const { request, response } = require('express');
var mongoose = require('mongoose');

// models
const service = require('../models/service');

// Mostrar Servicios
const getService = async( req = request, res = response ) => {

    const query = { state: true};

    const [ total, servicios ] = await Promise.all([
        service.countDocuments( query ),
        service.find( query )
    ]);

    res.json({
        total,
        servicios
    });

}

// Crear Servicios
const postService = async( req = request, res = response ) => {

    // const body = req.body;
    const { titulo, id_categoria, descripcion, valor, imagen, id_usuario_creador, logros, state } = req.body;
    const newService = new service({ titulo, id_categoria, descripcion, valor, imagen, id_usuario_creador, logros, state });

    // Guardar en db y esperar guardado
    await newService.save();

    res.json( newService );

}

// Actualizar Servicios
const putService = async( req, res) => {

    const { id } = req.params;
    const { _id, ...remainder } = req.body;

    const newService = await service.findByIdAndUpdate( id, remainder );

    res.json( newService );

}

// Eliminar Servicio
const deleteService = async(req, res) => {

    const { id } = req.params;
    
    const servicex = await service.findByIdAndUpdate( id, { state: false } );
    //const userAuth = req.userAuth;
    
    res.json({
        servicex, 
        //userAuth
    });

}

// Buscar los servicios de un usuario
const buscadorServicioUsuario = async( req = request , res = response ) => {
    const { id } = req.body;
    const objectId = mongoose.Types.ObjectId(id);
    const serviciosUser = await service.find({id_usuario_creador: objectId});
    res.json( serviciosUser );
}

// Buscar los servicios en base a una categoria
const buscadorServicioCategoria = async( req = request , res = response ) => {
    const { id_categoria } = req.body;
    const objectId = mongoose.Types.ObjectId(id_categoria);
    const serviciosUser = await service.find({id_categoria: objectId});
    res.json( serviciosUser );
}

// Buscador de servicio por titulo
const buscadorTitulo = async( req = request , res = response ) => {

    const { titulo } = req.body;
    if(titulo){
        const servicios = await service.find({titulo:{$regex:'.*'+titulo+'.*',$options:"i"}});
        res.json( servicios );
    }else{
        const servicios = await service.find({})
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