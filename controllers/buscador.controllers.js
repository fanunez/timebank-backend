// npm packages
const { response, request } = require('express');
// models 
const service = require('../models/service');

// Buscador de servicio
const buscador = async( req = request , res = response ) => {

    const { titulo } = req.query;
    if(titulo){
        const servicios = await service.find({titulo:{$regex:'.*'+titulo+'.*',$options:"i"}});
        res.json( servicios );
    }else{
        const servicios = await service.find({})
        res.json( servicios );
    }

}

module.exports = {
    buscador
}