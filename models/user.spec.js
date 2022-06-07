const expect = require('chai').expect
const chai = require('chai')

const User = require('./user');

describe('User', () => {
    // set up the model without any parameter
    const user = new User();
    
    it( 'should be invalid if name is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.name ).to.exist;
            done();
        });
    })

    it( 'should be invalid if surname is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.surname ).to.exist;
            done();
        });
    })

    it( 'should be invalid if relation is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.relation ).to.exist;
            done();
        });
    })


    it( 'should be invalid if age is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.age ).to.exist;
            done();
        });
    })

    it( 'should be invalid if address is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.address ).to.exist;
            done();
        });
    })

    it( 'should be invalid if phone is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.phone ).to.exist;
            done();
        });
    })

    it( 'should be invalid if rut is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.rut ).to.exist;
            done();
        });
    })

    it( 'should be invalid if email is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.email ).to.exist;
            done();
        });
    })

    it( 'should be invalid if password is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.password ).to.exist;
            done();
        });
    })

    it( 'should be invalid if type_user is empty', ( done ) => {
        user.validate( ( err ) => {
            expect( err.errors.type_user ).to.exist;
            done();
        });
    })
    
    it( 'should be invalid if balance is not 0 by default', ( done ) => {
        expect( user.balance ).to.be.a('number')
        expect( user.balance ).to.equal( 0 );
        done();
    })

    it( 'should be valid user when state is true, name|surname|relation|age|address|phone|rut|email|password|type_user|img are strings and balance is number ', ( done ) => {
        // state is true by default
        // balance is 0 by default
        const userTest = new User({
            name: "test",
            surname: "test",
            relation: "test",
            age: "test",
            address: "test",
            phone: "test",
            rut: "test",
            email: "test",
            password: "test",
            type_user: "test",
            img: "test",
        })
        expect( userTest.name ).to.be.string;
        expect( userTest.suname ).to.be.string;
        expect( userTest.relation ).to.be.string;
        expect( userTest.age ).to.be.string;
        expect( userTest.address ).to.be.string;
        expect( userTest.phone ).to.be.string;
        expect( userTest.rut ).to.be.string;
        expect( userTest.email ).to.be.string;
        expect( userTest.password ).to.be.string;
        expect( userTest.type_user ).to.be.string;
        expect( userTest.img ).to.be.string;
        expect( userTest.balance ).to.be.a('number')
        expect( userTest.state ).to.be.true;
        done();
    })

})