// define npm modules
const { response } = require('express');
// import models
const { Category } = require('../../models');

// base route
const base_url = "http://164.92.96.206:8081/api/category"

describe("Category Tests", function () {
    // Category Accepted
    it("Category: Accepted", () => {
        // create data
        const data = {
            "name": "test", 
            "petition": 5,
            "state": true
        }
        const category = new Category( data );  

        const categoryJson = {
            "name": category.name,
            "petition": category.petition,
            "state": category.state
        }

        expect( categoryJson ).toEqual( data );
    })

})
