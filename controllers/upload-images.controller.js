// npm modules
const { response } = require("express");
// API
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );
// Models
const { User, Service, Category } = require('../models');

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
        
        case 'service':
            model = await Service.findById( id ); 
            if( !model ) {
                return res.status(400).json({ 
                    msg: `No existe servicio con id ${ id }`
                })
            }
            break;

        case 'category':
            model = await Category.findById( id );
            if( !model ) {
                return res.status(400).json({ 
                    msg: `No existe categoria con id ${ id }`
                })
            }
            break;
                    
        default:
            return res.status(500).json({ msg: 'Coleccion no implementada' });
    }

    // Delete previous images from Cloudinary (only if IMG is different from the default image)
    if ( model.img && model.img != process.env.DEFAULT_USER_IMAGE ) {
        console.log('la cambie');
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