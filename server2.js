const express = require('express');
const jwt = require('jsonwebtoken'); 
const app = express();
const path = require('path');
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const mysqlConnection = require("./user/connection1.js");
const staticPath = path.join(__dirname, "./user");
app.use(express.static(staticPath));
app.use(cors());
app.use(bodyParser.json());

let authenticatedUser = null; 

app.post("/login",(req, res) => {
    const { PersonID } = req.body;

    mysqlConnection.query(
        "SELECT * FROM Persons WHERE PersonID = ?", [PersonID],
        function(err, result) {
            if (err) {
                console.log("sql", err);
                res.json({ error: "Database error" });
            } else {
                if (result.length > 0) {
                    const token = jwt.sign({ PersonID: PersonID }, 'secret_key');
                    authenticatedUser = result[0]; 
                    res.json({ message: "Login successful", token: token });
                } else {
                    res.json({ error: "Invalid credentials" });
                }
            }
        }
    );
});

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        console.log('No token found');
        return res.json({ error: "Unauthorized" });
    }

    jwt.verify(token.replace('Bearer ', ''), 'secret_key', (err, decoded) => {
        if (err) {
            console.log('Token verification error:', err);
            return res.json({ error: "Unauthorized" });
        }
        console.log('Token verified, decoded:', decoded);
        req.PersonID = decoded.PersonID; 
        next();
    });
}
app.get("/",verifyToken,(req, res) => {
    mysqlConnection.query(
        "SELECT * FROM Persons",
        function(err, result) {
            if (err) {
                console.log("sql", err);
                res.json({ error: "Database error" });
            } else {
                res.json(result);
            }
        }
    );
});

app.put("/editdata", verifyToken, (req, res) => {
    // const { PersonID } = req;
    const { LastName, FirstName, Address, City } = req.body;
if(authenticatedUser){
    const requestedPersonID = authenticatedUser.PersonID;
if(req.body.PersonID===requestedPersonID){
    mysqlConnection.query(
        "UPDATE Persons SET LastName=?, FirstName=?, Address=?, City=? WHERE PersonID = ?",
        [LastName, FirstName, Address, City, requestedPersonID],
        function(err, result) {
            if (err) {
                console.log("sql", err);
                res.json({ error: "Database error" });
            } else {
                  res.json({ message: "Data edited successfully" });
                }
        }
    );
}else{
            res.json({ error: "Access denied: You can only edit your own data." });
        }
}else {
        res.json({ error: "Access denied" });
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
