// define npm modules
const { response } = require('express');
const axios = require('axios').default;
// import models
const { Category } = require('../../models');

// base route
const base_url = "http://164.92.96.206:8081/api/category"

describe("Category Tests", function () {
    // Category: Accepted
    it("Category: Post Category", (done) => {
        // defining uid variable
        let uid;
        // send POST request
        axios.post(base_url, {
            "name": "test", 
            "petition": 5,
        })
        .then(function (response) {
            uid = response.data.uid; 
            // Testing
            expect(response.data.name).toEqual("test");
            expect(response.data.petition).toEqual(5);
            expect(response.data.state).toEqual(true);

        })
        .catch(function (error) {
            console.info(error);
        });
        // Delete from database
        Category.findByIdAndDelete( uid );
        done();
    })
    // Category: Rejected
    it( 'Category: Rejected', () => {
        
    })

})
