// define npm modules
const { response } = require('express');
const axios = require('axios').default;

// import models
const { Achievement } = require('../../models');
const { mongoConnection } = require('../../database/config');
require('dotenv').config()

// base route
//const base_url = "http://164.92.96.206:8081/api/service"
const base_url = "http://localhost:8080/api/achievement"

let uid;

describe("Achievements Tests", function () {
    
    beforeAll(async () => {
        await mongoConnection();
    })

    afterAll(async () => {
        await Achievement.findByIdAndDelete(uid);
    })

    it("Achievement: Get Achievements", ( done ) => {
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

    it("Achievement: Get Achievements By ID", ( done ) => {
        // send Get request
        axios.get(base_url + "/62994436c00a687f802c62a2")
        .then( ( response ) => {
            // Testing
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    it("Achievement: Post Achievement", ( done ) => {
        // send POST request
        axios.post( base_url, {
            "name": "Test3",
            "description" : "Test3",
            "state": true
        })
        .then( ( response ) => {
            // Testing
            uid = response.data.uid;
            expect( response.data.name ).toEqual( "Test3" );
            expect( response.data.description ).toEqual( "Test3" );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    it("Achievement: Put Achievement", ( done ) => {
        // send POST request
        axios.put( base_url + "/62994436c00a687f802c62a2", {
            "name": "Test3",
            "description" : "Test3",
            "state": true
        })
        .then( ( response ) => {
            // Testing
            expect( response.data.name ).toEqual( "Test3" );
            expect( response.data.description ).toEqual( "Test3" );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })



})
