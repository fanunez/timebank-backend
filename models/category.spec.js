// test packages
const expect = require('chai').expect
const chai = require('chai')
// model
const Category = require('./category');

describe('Category', () => {
    // set up the model without any parameter
    const category = new Category();

    it( 'should be invalid if name is empty', ( done ) => {
        category.validate( ( err ) => {
            expect( err.errors.name ).to.exist;
            done();
        });
    })

    it( 'should be invalid if petition is empty', ( done ) => {
        category.validate( ( err ) => {
            expect( err.errors.petition ).to.exist;
            done();
        });
    })

    it( 'should be valid category when state is true, name is string and petition is number', ( done ) => {
        // state is true by default
        const categoryTest = new Category({
            name: "test",
            petition: 5
        })
        expect( categoryTest.name ).to.be.string;
        expect( categoryTest.petition ).to.be.a('number')
        expect( categoryTest.state ).to.be.true;
        done();
    })

})