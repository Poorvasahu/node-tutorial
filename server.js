const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
const port = 3000;
const hbs = require("hbs");
const mysqlConnection = require("./student/connection.js");
app.set("view engine", "hbs");
const staticPath = path.join(__dirname, "./student");
app.use(express.urlencoded({ extended: true }));
const studentPath = path.join(__dirname, "./templates/views");
app.set("views", studentPath);
app.use(express.static(staticPath));

app.get("/", (req, res) => {
    res.render('home');
});

app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/add", (req, res) => {
    res.render('add_detail');
});

app.get("/name", (req, res) => {
    res.render("name")
})

app.post("/add", (req, res) => {
    console.log(req.body.id);
    console.log(req.body.name);
    console.log(req.body.password);
    console.log(req.body.college);

    var id = req.body.id;
    var name = req.body.name;
    var college = req.body.college;
    var password = req.body.password;
    // console.log(id, name, password)
    try {
        mysqlConnection.query(
            "INSERT into student (id,name,password,college) values(?,?,?,?)", [id, name, password, college],
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({ error: "Error occurred while inserting data into the database." });
                } else {
                    console.log(result)
                    console.log("Data inserted successfully!");
                    res.redirect("/");
                }
            }
        );
    } catch (err) {
        console.log(err);
    }
});

app.post("/name", (req, res) => {
    const idToSearch = req.body.id;
    const passwordToCheck = req.body.password;
    console.log(idToSearch, passwordToCheck)
    try {
        mysqlConnection.query(
            "SELECT * FROM student WHERE id = ? AND password = ?", [idToSearch, passwordToCheck],
            function(err, result) {
                if (err) {
                    console.log("sql", err);
                    res.json({ error: "Error occurred while checking the data" });
                } else {
                    if (result.length > 0) {
                        const loggedInUser = result[0].name;
                        res.render("name", { student: result[0], loggedInUser });
                    } else {
                        res.send("id_or_password_not_found");
                    }
                }
            }
        );
    } catch (err) {
        console.log("catch", err);
        res.render("404");
    }
});

app.get("/getStudent", (req, res) => {
    mysqlConnection.query(
        "SELECT * FROM student",
        function(err, result) {
            if (err) {
                console.log("sql", err);
            } else {
                res.json(result);
            }
        }
    );
});

app.delete('/delete', (req, res) => {
    const idToDelete = req.query.id;

    try {
        mysqlConnection.query(
            'DELETE FROM student WHERE id = ? ', [idToDelete],
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    if (result.affectedRows > 0) {
                        console.log("Student deleted successfully!");
                    } else {
                        res.send("data not found")
                    }
                }
            }
        );
    } catch (err) {
        console.log("catch", err);
        res.json({ error: "Error occurred while processing the request." });
    }
});

app.get("/edit/:id", (req, res) => {
    const studentId = req.params.id;
    try {
        mysqlConnection.query(
            "SELECT * FROM student WHERE id = ?", [studentId],
            function(err, result) {
                if (err) {
                    console.log("sql", err);
                    res.json({ error: "Error occurred while retrieving student data" });
                } else {
                    if (result.length > 0) {
                        res.render('edit_detail', { student: result[0] });
                    } else {
                        res.send("Student not found");
                    }
                }
            }
        );
    } catch (err) {
        console.log("catch", err);
        res.json({ error: "Error occurred while processing the request." });
    }
});

app.post("/update", (req, res) => {
    // const idToUpdate = req.body.id;
    // const nameToUpdate = req.body.name;
    // const collegeToUpdate = req.body.college;
    // const passwordToUpdate = req.body.password;

    const { id, name, college, password } = req.body;
    try {
        mysqlConnection.query(
            "UPDATE student SET name=?, college=?, password=? WHERE id=?", [name, college, password, id],
            function(err, result) {
                if (err) {
                    console.log(err);
                    res.json({ error: "Error occurred while updating student data" });
                } else {
                    if (result.affectedRows > 0) {
                        res.redirect("/name");
                    } else {
                        res.send("Student not found");
                    }
                }
            }
        );
    } catch (err) {
        console.log("catch", err);
        res.json({ error: "Error occurred while processing the request." });
    }
});

app.get("/view", (req, res) => {
    res.render('details')
})

app.get("/view/:id", (req, res) => {
    const studentId = req.params.id;
    try {
        mysqlConnection.query(
            "SELECT * FROM student WHERE id = ?", [studentId],
            function(err, result) {
                if (err) {
                    console.log("sql", err);
                } else {
                    console.log(result)
                    if (result.length > 0) {
                        res.render("details", { student: result[0] });
                    } else {
                        res.send("Student not found");
                    }
                }
            }
        );
    } catch (err) {
        console.log("catch", err);
        res.json({ error: "Error occurred while processing the request." });
    }
});

app.get("/logout", (req, res) => {
    res.redirect("/");
})

app.get("*", (req, res) => {
    res.render('error', {
        error: "oops page not found"
    })
});

app.listen(port, () => {
    console.log(`listening ${port}`);
});
module.exports = mysqlConnection;