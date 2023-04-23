const assert = require("chai").assert;
const expect = require("chai").expect;
const chai = require("chai")
const chaiHttp = require("chai-http")
const gameController = require("../controller/gameController")
const userController = require("../controller/userController")
const server = require("../index.js")

chai.use(chaiHttp)

let ticResult = gameController.ticFunc()
let snakeResult = gameController.snakeFunc()
let ludoResult = gameController.ludoFunc()

describe("Games", function(){
    describe("tic()", function(){
        it("tic should return object", function(){
            ticResult.then((result) => {
                assert.isObject(result)
            })
        })
        it("tic status 200", function(done) {
            chai.request(server).get("/tic-tac-toe")
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
    describe("snake()", function(){
        it("snake should return object", function(){
            snakeResult.then((result) => {
                assert.isObject(result)
            })
        })
        it("snake status 200", function(done) {
            chai.request(server).get("/snake-ladder")
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
    describe("ludo()", function(){
        it("ludo should return object", function(){
            ludoResult.then((result) => {
                assert.isObject(result)
            })
        })
        it("ludo status 200", function(done) {
            chai.request(server).get("/snake-ladder")
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                })
            })
        })
})

describe("User", function() {
    describe("getUser()", function(){
        it("getUser should return object", function(){
            userController.getUser().then((result) => {
                assert.isObject(result)
            })
        })
        it("getUser length > 1", function(){
            userController.getUser().then((result) => {
                assert.isAtleast(result.length,1)
            })
        })
    })
})
