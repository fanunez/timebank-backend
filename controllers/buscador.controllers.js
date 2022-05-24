// npm packages
const { response, request } = require('express');
// models 
const service = require('../models/service');

// Buscador de servicio
const buscador = async( req = request , res = response ) => {

    const { titulo } = req.body;
    if(titulo){
        const servicios = await service.find({titulo:{$regex:'.*'+titulo+'.*',$options:"i"}});
        console.log("Entro aqui");
        res.json( servicios );
    }else{
        const servicios = await service.find({})
        console.log("Entro aqui2");
        res.json( servicios );
    }

}

module.exports = {
    buscador
}