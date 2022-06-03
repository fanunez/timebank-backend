// define npm modules
const { response } = require('express');
const axios = require('axios').default;

// import models
const { Transaction } = require('../../models');
const { mongoConnection } = require('../../database/config');
require('dotenv').config()

// base route
//const base_url = "http://164.92.96.206:8081/api/transaction"
const base_url = "http://localhost:8080/api/transaction"

let uid;

describe("Transaction Tests", function () {
    
    beforeAll(async () => {
        await mongoConnection();
    })

    afterAll(async () => {
        await Transaction.findByIdAndDelete(uid);
    })

    it("Transaction: Get Transactions", ( done ) => {
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

    it("Transaction: Post Transaction", ( done ) => {
        // send POST request
        axios.post( base_url, {
            "id_user_aplicant" : "629819643a747ec3a692da5f",
            "id_user_owner" : "62993b480f657503412fa013",
            "id_service" : "62992f75734bb41df681a4e6",
            "state_request" : 1,
            "state" : true
        })
        .then( ( response ) => {
            // Testing
            uid = response.data.uid;
            expect( response.data.id_user_aplicant ).toEqual( "629819643a747ec3a692da5f" );
            expect( response.data.id_user_owner ).toEqual( "62993b480f657503412fa013" );
            expect( response.data.id_service ).toEqual( "62992f75734bb41df681a4e6" );
            expect( response.data.state_request ).toEqual( 1 );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    it("Transaction: Put Transaction", ( done ) => {
        // send Put request
        axios.put( base_url + "/62993d481c0b3ee1c694133d", {
            "id_user_aplicant" : "629819643a747ec3a692da5f",
            "id_user_owner" : "62993b480f657503412fa013",
            "id_service" : "62992f75734bb41df681a4e6",
            "state_request" : 1,
            "state" : true
        })
        .then( ( response ) => {
            // Testing
            expect( response.data.id_user_aplicant ).toEqual( "629819643a747ec3a692da5f" );
            expect( response.data.id_user_owner ).toEqual( "62993b480f657503412fa013" );
            expect( response.data.id_service ).toEqual( "62992f75734bb41df681a4e6" );
            expect( response.data.state_request ).toEqual( 1 );
            expect( response.data.state ).toEqual( true );
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })

    // Eliminar transaction pendiente

    it("Service: Get Own Request By User Id", ( done ) => {
        // send Get request
        axios.get( base_url + "/own_request/629819643a747ec3a692da5f")
        .then( ( response ) => {
            // Testing
            expect(response.status).toBe(200);
            done();
        })
        .catch(function (error) {
            console.info(error);
        });
    })
    
    it("Service: Get Service Requests By User Id Owner", ( done ) => {
        // send Get request
        axios.get( base_url + "/owner_requests/62993b480f657503412fa013")
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
