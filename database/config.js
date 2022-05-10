
const mongoose = require('mongoose');


const mongoConnection = async() => {

    try{
        // wait for connection
        await mongoose.connect( process.env.MONGO_ATLAS_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log( 'Mongo database online' );

    } catch( error ){
        console.log( error );
        throw new Error( 'Error initializing database' );
    }

}

module.exports = {
    mongoConnection
}