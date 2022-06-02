// define npm modules
const { response } = require('express');
const axios = require('axios').default;
// import models
const { Category } = require('../../models');

// base route
const base_url = "http://164.92.96.206:8081/api/category"

describe("Category Tests", function () {
    
    // Category: Accepted
    it("Category: Get Category", ( done ) => {
        // send Get request
        axios.get( base_url)
        .then( ( response ) => {
            // Testing
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    // Category: Accepted
    it("Category: Get By Id Category", ( done ) => {
        // send Get request
        axios.get( base_url + "/6296a38ca73084acaf966e24")
        .then( ( response ) => {
            // Testing
            console.info(response.data);
            expect( response.data.name ).toEqual( "Test" );
            expect( response.data.petition ).toEqual(0);
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    // Category: Accepted
    it("Category: Post Category", ( done ) => {
        // send POST request
        axios.post( base_url, {
            "name": "test", 
            "petition": 5,
        })
        .then( ( response ) => {
            // Testing
            expect( response.data.name ).toEqual( "test" );
            expect( response.data.petition ).toEqual( 5 );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            // Delete from database
            Category.findByIdAndDelete( response.data.uid );
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })




})
