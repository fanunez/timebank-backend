// define npm modules
const { response } = require('express');
const axios = require('axios').default;

// import models
const { Service } = require('../../models');
const { mongoConnection } = require('../../database/config');
require('dotenv').config()

// base route
//const base_url = "http://164.92.96.206:8081/api/service"
const base_url = "http://localhost:8080/api/service"

let uid;

describe("Service Tests", function () {
    
    beforeAll(async () => {
        await mongoConnection();
    })

    afterAll(async () => {
        await Service.findByIdAndDelete(uid);
    })

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

    it("Service: Post Service", ( done ) => {
        // send POST request
        axios.post( base_url, {
            "title" : "Test",
            "id_category" : "6296a38ca73084acaf966e24",
            "description" : "Test",
            "value" : 0,
            "id_owner" : "629819643a747ec3a692da5f",
            "achievements" : ["62982048af0d50625a28240e", "629821cadc337893f4062804"], 
            "state" : true, 
        })
        .then( ( response ) => {
            // Testing
            uid = response.data.uid;
            expect( response.data.title ).toEqual( "Test" );
            expect( response.data.id_category ).toEqual( "6296a38ca73084acaf966e24" );
            expect( response.data.description ).toEqual( "Test" );
            expect( response.data.value ).toEqual( 0 );
            expect( response.data.id_owner ).toEqual( "629819643a747ec3a692da5f" );
            expect( response.data.achievements ).toEqual( ["62982048af0d50625a28240e", "629821cadc337893f4062804"] );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    it("Service: Put Service", ( done ) => {
        // send POST request
        axios.put( base_url + "/62992f75734bb41df681a4e6", {
            "title" : "Test",
            "id_category" : "6296a38ca73084acaf966e24",
            "description" : "Test",
            "value" : 0,
            "id_owner" : "629819643a747ec3a692da5f",
            "achievements" : ["62982048af0d50625a28240e", "629821cadc337893f4062804"], 
            "state" : true, 
        })
        .then( ( response ) => {
            // Testing
            expect( response.data.title ).toEqual( "Test" );
            expect( response.data.id_category ).toEqual( "6296a38ca73084acaf966e24" );
            expect( response.data.description ).toEqual( "Test" );
            expect( response.data.value ).toEqual( 0 );
            expect( response.data.id_owner ).toEqual( "629819643a747ec3a692da5f" );
            expect( response.data.achievements ).toEqual( ["62982048af0d50625a28240e", "629821cadc337893f4062804"] );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    // Eliminar servicio Pendiente

    it("Service: Get Search By User Id", ( done ) => {
        // send Get request
        axios.get( base_url + "/buscarUsuario/629819643a747ec3a692da5f")
        .then( ( response ) => {
            // Testing
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    it("Service: Get Search By Category Id", ( done ) => {
        // send Get request
        axios.get( base_url + "/buscarCategoria/6296a38ca73084acaf966e24")
        .then( ( response ) => {
            // Testing
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    it("Service: Get Search By Title", ( done ) => {
        // send Get request
        axios.get( base_url + "/buscarTitulo/Taller")
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
