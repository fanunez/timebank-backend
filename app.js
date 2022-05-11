// npm packages
require('dotenv').config()

// our packages
const Server = require('./models/server')

const server = new Server();

server.listen();
