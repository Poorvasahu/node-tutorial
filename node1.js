// const lovish = require("./node2")
// console.log("hello world", lovish)

const express = require('express');
const router = express.Router();
const database = require('./node3');

router.get("/", function(request, response, next) {
    response.send('list all the sample');
});

router.get("/add", function(request, response, next) {
    response.send('add sample data')
})
module.exports = router;