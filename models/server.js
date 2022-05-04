// npm packages
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        // Middlewares
        this.middlewares();
        // Aplication routes
        this.routes();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );
        // Read and parse body to json
        this.app.use( express.json() );
        // Public directory
        this.app.use( express.static('public') );

    }
    // Defining routes
    routes() {
        this.app.use( '/api/users', require('../routes/user.routes') );
    }
    // Listening port
    listen() {
        this.app.listen( this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }


}

module.exports = Server;