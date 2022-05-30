// Import models
const { User, Category, Achievement, Service } = require('../models');

// Verificacion de correo 
const emailValidator = async( email = '' ) => {
    const exist = await User.findOne({ email });
    if( exist ) {
        throw new Error(`El email ${ email } ya está registrando en la base de datos`);
    }
}

// Verificacion de existencia de id de usuario
const existUserById = async( id ) => {
    const exist = await User.findById( id );
    if( !exist ) {
        throw new Error(`No existe usuario con id ${ id }`);
    }
}

// Verificacion de existencia de id de categoria
const existCategoryById = async( id ) => {
    const exist = await Category.findById( id );
    if( !exist ) {
        throw new Error(`No existe categoria con id ${ id }`);
    }
}

// Verificacion de colecciones
const collectionAllowed = ( collection = '', collections = [] ) => {
    
    const include = collections.includes( collection );
    if( !include ) {
        throw new Error(`No existe la coleccion ${ collection }. Por favor, utilice: ${ collections }`)
    }

    return true;
}

// Verificar 
const existAchievementById = async( id ) => {
    const exist = await Achievement.findById( id );
    if( !exist ) {
        throw new Error(`No existe logro con id ${ id }`);
    }
}

// Verificacion de existencia de id de servicio
const existServiceById = async( id ) => {
    const exist = await Service.findById( id );
    if( !exist ) {
        throw new Error(`No existe servicio con id ${ id }`);
    }
}



module.exports = {
    // roleValidator,
    emailValidator,
    existUserById,
    collectionAllowed,
    existCategoryById,
    existAchievementById,
    existServiceById,
}