// npm packages
const { request, response } = require('express');
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


module.exports = {
    getService,
    postService,
    putService,
    deleteService,
}