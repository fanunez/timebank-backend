// // test packages
// const mockery = require('mockery');
// const chai    = require('chai');
// const expect  = chai.expect;

// describe( "route user.route", () => {

//     beforeEach(function () {
//         mockery.enable({
//             warnOnReplace: false,
//             warnOnUnregistered: false,
//             useCleanCache: true
//         });
//     });

//     afterEach(function () {
//         mockery.disable();
//         mockery.deregisterAll();
//     });

//     describe( "check route", () => {
//         // GET USER ROUTE
//         it( 'call mock routes', () => {

//             const routerStub = {
//                 get: sinon.stub(router, 'getUser').returnsThis(),
//                 post: sinon.stub().returnsThis(),
//                 put: sinon.stub().returnsThis(),
//                 delete: sinon.stub().returnsThis(),
//             }

//             sinon.stub( express, 'Router' ).callsFake(() => routerStub );
//             sinon.assert.calledWith( routerStub.get, sinon.match.func );
//             sinon.assert.calledWith( routerStub.post, sinon.match.func );
//             sinon.assert.calledWith( routerStub.put, sinon.match.func );
//             sinon.assert.calledWith( routerStub.delete, sinon.match.func );
//         });
//     });  
// });
