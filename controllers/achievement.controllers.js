// npm packages
const { request, response } = require('express');
// models
const { Achievement } = require('../models');

// Show all Achievement with state true (actives)
const getAchievement = async( req = request, res = response ) => {
    const query = { state: true};
    const [ total, achievement ] = await Promise.all([
        Achievement.countDocuments( query ),
        Achievement.find( query )
    ]);
    res.json({
        total,
        achievement
    });
}

// Get Achievement by id
const getAchievementById = async( req, res = response ) => {
    const { id } = req.params;
    const achievement = await Achievement.findById( id );
    res.json( achievement );
}

// Create Achievement
const postAchievement = async( req = request, res = response ) => {
    const { name, description, state} = req.body;
    const newAchievement = new Achievement({ name, description, state });
    await newAchievement.save();
    res.json( newAchievement );
}

// Update Achievement
const putAchievement = async( req, res) => {
    const { id } = req.params;
    const { _id, ...remainder } = req.body;
    const newAchievement = await Achievement.findByIdAndUpdate( id, remainder );
    res.json( newAchievement );

}

// Delete Achievement
const deleteAchievement = async(req, res) => {
    const { id } = req.params;
    const achievement = await Achievement.findByIdAndUpdate( id, { state: false } );
    res.json( achievement );
}


module.exports = {
    getAchievement,
    getAchievementById,
    postAchievement,
    putAchievement,
    deleteAchievement,
}
