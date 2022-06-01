const { response } = require('express');
const { Router } = require('express');
const router = Router();
var base_url = "http://164.92.96.206:8081/category"

describe("Category Tests", function () {

    it("The function to post categories", function (done) {

        const request = {
            body: {
                "name": "Prueba",
                "petition": 3,          
            }
        };

        router.post(base_url, function(req = request, res = response){
            expect(response.name).toEqual(request.body.name);
            expect(response.petition).toEqual(request.body.petition);
            expect(response.state).toEqual(true);
            done();
        })
    })

})
