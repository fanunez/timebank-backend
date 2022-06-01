// npm packages
const { request, response } = require('express');
// models
const { Category } = require('../models');

// Mostrar Categorias
const getCategory = async( req = request, res = response ) => {

    const query = { state: true};

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( query ),
        Category.find( query )
    ]);

    res.json({
        total,
        categories
    });

}

// Obtener categoria mediante id
const getCategoryById = async( req, res = response ) => {

    const { id } = req.params;
    const categoryaux = await Category.findById( id );
    res.json({
        categoryaux 
    });

}

// Crear Categoria
const postCategory = async( req = request, res = response ) => {

    // const body = req.body;
    const { name, petition } = req.body;
    const newCategory = new Category({ name, petition });

    // Guardar en db y esperar guardado
    await newCategory.save();

    res.json( newCategory );

}

// Buscador de categoria
const buscador = async( req = request , res = response ) => {

    const { name } = req.params;
    if(name){
        const categories = await Category.find({name:{$regex:'.*'+name+'.*',$options:"i"}});
        res.json( categories );
    }else{
        const categories = await Category.find({})
        res.json( categories );
    }

}

module.exports = {
    getCategory,
    getCategoryById,
    postCategory,
    buscador,
}