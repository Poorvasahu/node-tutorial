const mysql = require("mysql");
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2681',
    database: 'user'
});
mysqlConnection.connect((err) => {
    if (err) {
        console.log("error in db connection", err);
        return;
    } else {
        console.log('DB connected successfully')
    }
})
module.exports = mysqlConnection;