// const fs = require('fs');

// function nodeStyleCallback(err, data) {
//     if (err) {
//         console.error('There was an error', err);
//         return;
//     }
//     console.log(data);
// }
// fs.readFile('/some/file/that/does-not-exist', nodeStyleCallback);
// fs.readFile('/some/file/that/does-exist', nodeStyleCallback);

// try {
//     const a = 1;
//     const c = a + b;
// } catch (err) {
//     console.log(err);
// }

const { Router } = require('express');
const mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'anshika',
    user: 'root',
    password: '2681'
});

connection.connect(function(error) {
    if (error) {
        console.log(error);
    } else {
        console.log("mysql database is connected successfully")
    }
})
module.exports = Router;