// npm packages
const { response } = require('express');

// GET METHOD
const getUser = ( req, res = response ) => {
    res.json({
        msg: 'get API - from controller'
    })
}
// POST METHOD
const postUser = ( req, res = response ) => {

    // const body = req.body;
    const { name } = req.body;

    res.json({
        msg: 'post API - from controller',
        name
    })
}
// PUT METHOD
const putUser = ( req, res = response ) => {
    res.json({
        msg: 'put API - from controller'
    })
}
// PATCH METHOD
const patchUser = ( req, res = response ) => {
    res.json({
        msg: 'patch API - from controller'
    })
}
// DELETE METHOD
const deleteUser = ( req, res = response ) => {
    res.json({
        msg: 'delete API - from controller'
    })
}


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser,
}