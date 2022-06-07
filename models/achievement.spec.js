const expect = require('chai').expect
const chai = require('chai')

const Achievement = require('./achievement');

describe('Achievement', () => {
    // set up the model without any parameter
    const achievement = new Achievement()

    it( 'should be invalid if name is empty', ( done ) => {
        achievement.validate( ( err ) => {
            expect( err.errors.name ).to.exist;
            done();
        });
    })

    it( 'should be invalid if description is empty', ( done ) => {
        achievement.validate( ( err ) => {
            expect( err.errors.description ).to.exist;
            done();
        });
    })

    it( 'should be valid achievement when state is true, name is string and description is string', ( done ) => {
        // state is true by default
        const achievementTest = new Achievement({
            name: "test",
            description: "description test"
        })
        expect( achievementTest.name ).to.be.string;
        expect( achievementTest.description ).to.be.string;
        expect( achievementTest.state ).to.be.true;
        done();
    })

})