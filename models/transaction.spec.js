// test packages
const expect = require('chai').expect
const chai = require('chai')
// additional packages
const ObjectId = require('mongoose').Types.ObjectId;
// model
const Transaction = require('./transaction');

// defining function who compares ObjectId
const safeObjectId = ( id ) => {
    return ObjectId.isValid( id ) ? new ObjectId( id ) : null
}

describe('Transaction', () => {
    // set up the model without any parameter
    const transaction = new Transaction();

    it( 'should be invalid if id_user_aplicant is empty', ( done ) => {
        transaction.validate( ( err ) => {
            expect( err.errors.id_user_aplicant ).to.exist;
            done();
        });
    })

    it( 'should be invalid if id_user_owner is empty', ( done ) => {
        transaction.validate( ( err ) => {
            expect( err.errors.id_user_owner ).to.exist;
            done();
        });
    })

    it( 'should be invalid if id_service is empty', ( done ) => {
        transaction.validate( ( err ) => {
            expect( err.errors.id_service ).to.exist;
            done();
        });
    })

    it( 'should be invalid if date is empty', ( done ) => {
        transaction.validate( ( err ) => {
            expect( err.errors.date ).to.exist;
            done();
        });
    })

    it( 'should be invalid if state_request is empty', ( done ) => {
        transaction.validate( ( err ) => {
            expect( err.errors.state_request ).to.exist;
            done();
        });
    })

    it( 'should be valid transaction when state is true, id_user_aplicant|id_user_owner|id_service are Mongo ObjectId, date is Date and state_request is number', ( done ) => {
        // state is true by default
        const transactionTest = new Transaction({
            id_user_aplicant: ObjectId(),
            id_user_owner: ObjectId(),
            id_service: ObjectId(),
            date: new Date(0),
            state_request: 5
        })
        expect( safeObjectId( transactionTest.id_user_aplicant ) );
        expect( safeObjectId( transactionTest.id_user_owner ) );
        expect( safeObjectId( transactionTest.id_service ) );
        chai.assert.deepEqual( transactionTest.date, new Date(0) );
        expect( transactionTest.state_request ).to.be.a('number')
        expect( transactionTest.state ).to.be.true;
        done();
    })

})