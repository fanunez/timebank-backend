// npm packages
const express = require('express');
const cors = require('cors');

const { mongoConnection } = require('../database/config');
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        // Paths and routes
        this.paths = {
            authPath: '/api/auth',
            userPath: '/api/users',
            buscadorPath: '/api/buscador',
            categoryPath: '/api/category'
        }
        // Connect database
        this.connectDatabase();
        // Middlewares
        this.middlewares();
        // Aplication routes
        this.routes();
    }

    
    async connectDatabase() {
        await mongoConnection();
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
        this.app.use( this.paths.authPath, require('../routes/auth.routes') );
        this.app.use( this.paths.userPath, require('../routes/user.routes') );
        this.app.use( this.paths.buscadorPath, require('../routes/buscador.routes') );
        this.app.use( this.paths.categoryPath, require('../routes/category.routes') );

    }
    // Listening port
    listen() {
        this.app.listen( this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }


}

module.exports = Server;