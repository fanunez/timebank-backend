// npm packages
const { request, response } = require('express');
// models
const { Category } = require('../models');
const trim = require('trim')

// Show all Categories with state true (actives)
const getCategory = async( _req = request, res = response ) => {
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

// Get Category by id
const getCategoryById = async( req, res = response ) => {
    const { id } = req.params;
    const category = await Category.findById( id );
    res.json( category );
}

// Create Category
const postCategory = async( req = request, res = response ) => {
    const { name, petition } = req.body;
    const newCategory = new Category({ name, petition });
    await newCategory.save();
    res.json( newCategory );
}

// Category searcher by title
const getCategoryByTitle = async( req = request , res = response ) => {
    let { name } = req.params;
    name = trim(name);
    if(name){
        const categories = await Category.find({name:{$regex:'.*'+name+'.*',$options:"i"},state: true});
        res.json( categories );
    }else{
        const categories = await Category.find({})
        res.json( categories );
    }
}

// Update Category
const putCategory = async( req = request , res = response ) => {
    const { id } = req.params;
    const { _id, ...remainder } = req.body;
    const newCategory = await Category.findByIdAndUpdate( id, remainder );
    res.json( newCategory );
}

// Delete Category
const deleteCategory = async( req = request , res = response ) => {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate( id, { state: false } );
    res.json( category );
}


module.exports = {
    getCategory,
    getCategoryById,
    postCategory,
    getCategoryByTitle,
    putCategory,
    deleteCategory
}