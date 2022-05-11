// npm packages
const { response, request } = require('express');
// models 
const service = require('../models/service');

// Buscador de servicio
const buscador = async( req, res = response ) => {

    const { titulo } = req.body;

    try {

        const post = await service.find({
            titulo:'Yoga'
        })
        
        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log( error );
        return res.status(500).json({
            msg: 'Algo salio mal :('
        })
    }

}

module.exports = {
    buscador
}