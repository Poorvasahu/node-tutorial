const express = require('express');
const app = express();
const path = require('path');
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const mysqlConnection = require("./user/connection1.js");
const staticPath = path.join(__dirname, "./user");
app.use(express.static(staticPath));
app.use(cors());
app.use(bodyParser.json());

let authenticatedUser = null; 

app.get("/", (req, res) => {
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

app.post("/login", (req, res) => {
    const { PersonID } = req.body;

    mysqlConnection.query(
        "SELECT * FROM Persons WHERE PersonID = ?", [PersonID],
        function(err, result) {
            if (err) {
                console.log("sql", err);
                res.json({ error: "Database error" });
            } else {
                if (result.length > 0) {
                    authenticatedUser = result[0]; 
                    res.json({ message: "Login successful" });
                } else {
                    res.json({ error: "Invalid credentials" });
                }
            }
        }
    );
});

app.put("/editdata", (req, res) => {
    const { LastName, FirstName, Address, City } = req.body;

    if (authenticatedUser) {
        const requestedPersonID = authenticatedUser.PersonID;

        if (req.body.PersonID === requestedPersonID) {
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
        } else {
            res.json({ error: "Access denied: You can only edit your own data." });
        }
    } else {
        res.json({ error: "Access denied" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
