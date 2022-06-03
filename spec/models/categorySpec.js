// define npm modules
const { response } = require('express');
const axios = require('axios').default;

// import models
const { Category } = require('../../models');
const { mongoConnection } = require('../../database/config');
require('dotenv').config()

// base route
const base_url = "http://164.92.96.206:8081/api/category"
// const base_url = "http://localhost:8080/api/category"

let uid;

describe("Category Tests", function () {
    
    //beforeAll(async () => {
    //    await mongoConnection();
    //})

    afterAll(async () => {
        await Category.findByIdAndDelete(uid);
    })

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

    it("Category: Get By Id Category", ( done ) => {
        // send Get request
        axios.get( base_url + "/6296a38ca73084acaf966e24")
        .then( ( response ) => {
            // Testing
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

    it("Category: Post Category", ( done ) => {
        // send POST request

        axios.post( base_url, {
            "name": "Test", 
            "petition": 5,
        })
        .then( async ( response ) => {
            // Testing
            uid = response.data.uid;
            expect( response.data.name ).toEqual( "Test" );
            expect( response.data.petition ).toEqual( 5 );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });

        
    })

    it("Category: Get Buscador By name Category", ( done ) => {
        // send Get request
        axios.get( base_url + "/categoryBuscador/Salud")
        .then( ( response ) => {
            // Testing
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

})
