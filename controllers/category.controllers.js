// npm packages
const { request, response } = require('express');
// models
const category = require('../models/category');

// Mostrar Categorias
const getCategory = async( req = request, res = response ) => {

    const query = { state: true};

    const [ total, categorys ] = await Promise.all([
        category.countDocuments( query ),
        category.find( query )
    ]);

    res.json({
        total,
        categorys
    });

}

// Crear Categoria
const postCategory = async( req = request, res = response ) => {

    // const body = req.body;
    const { name, request} = req.body;
    const newCategory = new category({ name, request});

    // Guardar en db y esperar guardado
    await newCategory.save();

    res.json( newCategory );

}

// Buscador de categoria
const buscador = async( req = request , res = response ) => {

    const { name } = req.body;
    if(name){
        const categories = await category.find({name:{$regex:'.*'+name+'.*',$options:"i"}});
        res.json( categories );
    }else{
        const categories = await category.find({})
        res.json( categories );
    }

}

module.exports = {
    getCategory,
    postCategory,
    buscador,
}