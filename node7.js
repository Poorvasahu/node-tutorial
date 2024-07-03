const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2681',
    database: 'employeedb'
});
mysqlConnection.connect((err) => {
    if (err) {
        console.log("error in db connection" + JSON.stringify(err, undefined, 2))
    } else {
        console.log('DB connected successfully')
    }
})
module.exports = mysqlConnection;