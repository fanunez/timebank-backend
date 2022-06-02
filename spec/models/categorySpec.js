// define npm modules
const { response } = require('express');
const axios = require('axios').default;
// import models
const { Category } = require('../../models');

// base route
const base_url = "http://164.92.96.206:8081/api/category"

describe("Category Tests", function () {
    // Category: Accepted
    it("Category: Post Category", ( done ) => {
        // send POST request
        axios.post( base_url, {
            "name": "test", 
            "petition": 5,
        })
        .then( ( response ) => {
            console.info("entre")
            // Testing
            expect( response.data.name ).toEqual( "test" );
            expect( response.data.petition ).toEqual( 5 );
            expect( response.data.state ).toEqual( true );
            // Delete from database
            Category.findByIdAndDelete( response.data.uid );
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })
    // Category: Rejected
    it( 'Category: Rejected', () => {
        
    })

})
