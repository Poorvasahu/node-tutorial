const connection = require("./node7");
const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json())

app.get('/employees', (req, res) => {
    connection.query('SELECT * FROM employee', (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(rows)
            res.send(rows)
        }
    })
})

app.get('/employees/:id', (req, res) => {
    connection.query('SELECT * FROM employee WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(rows)
            res.send(rows)
        }
    })
})
app.delete('/employees/:id', (req, res) => {
    connection.query('DELETE FROM employee WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err)
        } else {
            // console.log(rows)
            res.send(rows)
        }
    })
})


app.post('/employees', (req, res) => {
    var emp = req.body;
    // console.log(req.body)
    connection.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [emp.name, emp.salary], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.patch('/employees', (req, res) => {
    var emp = req.body;
    connection.query('UPDATE employee SET name=?, salary=? WHERE id=?', [emp.name, emp.salary, emp.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.send(rows);
        }
    });
});

app.put('/employees', (req, res) => {
    var emp = req.body;
    connection.query('UPDATE employee SET name=?, salary=? WHERE id=?', [emp.name, emp.salary, emp.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if (rows.affectedRows == 0) {
                connection.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [emp.name, emp.salary], (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send(rows);
                    }
                });
            } else {
                res.send(rows);
            }
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index2.html');
});

app.listen(3500, () => console.log(`express server running at port 3500`))