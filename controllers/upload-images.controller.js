// npm modules
const { response } = require("express");
// API
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );
// Models
const { User, Service } = require('../models');

// Upload image to Cloudinary serviciosUser
const updateImageCloudinary = async( req, res = response ) => {

    const { id, collection } = req.params;

    // conditional value to choose collection
    let model;
    switch ( collection ) {
        case 'users':
            model = await User.findById( id ); 
            if( !model ) {
                return res.status(400).json({ 
                    msg: `No existe usuario con id ${ id }`
                })
            }
            break;
        
        case 'services':
            model = await Service.findById( id ); 
            if( !model ) {
                return res.status(400).json({ 
                    msg: `No existe servicio con id ${ id }`
                })
            }
            break;
                    
        default:
            return res.status(500).json({ msg: 'Coleccion no implementada' });
    }

    // Delete previous images from Cloudinary
    if ( model.img ) {
        const nameArr = model.img.split('/');
        const name = nameArr[ nameArr.length - 1 ];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy( public_id );
    }

    // Store image in cloudinary using API
    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;
    await model.save();

    res.json( model );

}

module.exports = {
    updateImageCloudinary,
}