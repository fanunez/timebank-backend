// npm modules
const { request, response } = require('express');

const storeInformation = ( req = request, res = response, next ) => {
    
    req.userInformation = req.body

}

module.exports = {
    storeInformation
}