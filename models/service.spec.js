// test packages
const expect = require('chai').expect
const chai = require('chai')
// additional packages
const ObjectId = require('mongoose').Types.ObjectId;
// model
const Service = require('./service');

// defining function who compares ObjectId
const safeObjectId = ( id ) => {
    return ObjectId.isValid( id ) ? new ObjectId( id ) : null
}

describe('Service', () => {
    // set up the model without any parameter
    const service = new Service();

    it( 'should be invalid if title is empty', ( done ) => {
        service.validate( ( err ) => {
            expect( err.errors.title ).to.exist;
            done();
        });
    })

    it( 'should be invalid if id_category is empty', ( done ) => {
        service.validate( ( err ) => {
            expect( err.errors.id_category ).to.exist;
            done();
        }); 
    })      
            
    it( 'should be invalid if description is empty', ( done ) => {
        service.validate( ( err ) => {
            expect( err.errors.description ).to.exist;
            done();
        });
    })

    it( 'should be invalid if value is empty', ( done ) => {
        service.validate( ( err ) => {
            expect( err.errors.value ).to.exist;
            done();
        });
    })

    it( 'should be invalid if id_owner is empty', ( done ) => {
        service.validate( ( err ) => {
            expect( err.errors.id_owner ).to.exist;
            done();
        });
    })

    

    it( 'should be valid service when state is true, title|description|img are string, id_category|id_owner are Mongo ObjectId, achievement is an array of Mongo ObjectId and value is number', ( done ) => {
        // state is true by default
        const serviceTest = new Service({
            title: "test",
            id_category: ObjectId(),
            description: "test",
            value: 10,
            img: "test",
            id_owner: ObjectId(),
            achievements: [ObjectId()],
        })
        expect( serviceTest.title ).to.be.string;
        expect( safeObjectId( serviceTest.id_category ) );
        expect( serviceTest.description ).to.be.string;
        expect( serviceTest.value ).to.be.a('number')
        expect( serviceTest.img ).to.be.string;
        expect( safeObjectId( serviceTest.id_owner ) );
        expect( serviceTest.state ).to.be.true;
        expect( serviceTest.achievements ).to.be.an('array');
        expect( safeObjectId( serviceTest.achievements[0] ) );
        done();
    })

})