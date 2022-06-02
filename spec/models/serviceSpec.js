// define npm modules
const { response } = require('express');
const axios = require('axios').default;
// import models
const { Achievement } = require('../../models');

// base route
const base_url = "http://164.92.96.206:8081/api/service/"

describe("Service Tests", function () {
    
    it("Service: Get Service", ( done ) => {
        // send Get request
        axios.get(base_url)
        .then( ( response ) => {
            // Testing
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    /*

    // Category: Accepted
    it("Service: Post Service", ( done ) => {
        // send POST request
        axios.post( base_url, {
            "title" : "Test",
            "id_category" : "6296a38ca73084acaf966e24",
            "description" : "Test",
            "value" : 0,
            "image" : "http:Test",
            "id_owner" : "629819643a747ec3a692da5f",
            "achievements" : ["62982048af0d50625a28240e, 629821cadc337893f4062804"], 
            "state" : true 
        })
        .then( ( response ) => {
            // Testing
            console.info(response.data);
            expect( response.data.title ).toEqual( "Test" );
            expect( response.data.id_category ).toEqual( "6296a38ca73084acaf966e24" );
            expect( response.data.description ).toEqual( "Test" );
            expect( response.data.value ).toEqual( 0 );
            expect( response.data.image ).toEqual( "http:Test" );
            expect( response.data.id_owner ).toEqual( "629819643a747ec3a692da5f" );
            expect( response.data.achievements ).toEqual( ["62982048af0d50625a28240e, 629821cadc337893f4062804"] );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            // Delete from database
            Achievement.findByIdAndDelete( response.data.uid );
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    */


})
