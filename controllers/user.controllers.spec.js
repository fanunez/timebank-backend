// test packages
const mockery = require('mockery');
const chai    = require('chai');
const expect = chai.expect;
const sinon   = require('sinon');
// additional packages
const ObjectId = require('mongoose').Types.ObjectId;
// model
const { User } = require('../models')

describe( "controller user.controller", () => {
    beforeEach(function () {
        mockery.enable({
          warnOnReplace: false,
          warnOnUnregistered: false,
          useCleanCache: true
        });
    });
    afterEach(function () {
        mockery.disable();
        mockery.deregisterAll();
    });
    describe( "getUserById function", () => {
        it('tner usuario gjeje', async() => {
            let res = {
                name: "",
                surname: "",
                relation: "",
                age: 1,
                address: "",
                phone: "",
                rut: "",
                email: "",
                type_user: "",
                state: true,
                balance: 10,
                img: "",
                uid: "629af5f47be82f782f1a0d42"
            };
            let req = {};
            req.params = { id: "629af5f47be82f782f1a0d42" }
            // register functionality 
            mockery.registerMock( './user.controllers', {
                getUserById: () => {
                    console.log("mongoose")
                    const user = {
                        name: "",
                        surname: "",
                        relation: "",
                        age: 1,
                        address: "",
                        phone: "",
                        rut: "",
                        email: "",
                        type_user: "",
                        state: true,
                        balance: 10,
                        img: "",
                        uid: "629af5f47be82f782f1a0d42"
                    };
                    return Promise.resolve( user );
                }
            });

            const userControllers = require( './user.controllers' );
            const getUserByIdResponse = await userControllers.getUserById( req );
            console.log( getUserByIdResponse );
            expect( getUserByIdResponse ).to.be.equal( res );
        });
    });


});
