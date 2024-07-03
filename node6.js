const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2681',
    database: 'db'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }

    console.log('Connected to MySQL');
});

// Retrieve all records
app.get('/records', (req, res) => {
    connection.query('SELECT * FROM my_table', (err, results) => {
        if (err) {
            console.error('Error retrieving records:', err);
            res.status(500).send('Error retrieving records');
            return;
        }
        res.send(results);
    });
});

// Retrieve a specific record
app.get('/records/:id', (req, res) => {
    const id = req.params.id;

    connection.query('SELECT * FROM my_table WHERE id = ?', id, (err, results) => {
        if (err) {
            console.error('Error retrieving record:', err);
            res.status(500).send('Error retrieving record');
            return;
        }
        if (results.length === 0) {
            res.status(404).send('Record not found');
            return;
        }
        res.send(results[0]);
    });
});

// Create a new record
app.post('/records', (req, res) => {
    const { name, age } = req.body;

    if (!name || !age) {
        res.status(400).send('Missing required data (name and age)');
        return;
    }

    connection.query('INSERT INTO my_table SET ?', { name, age }, (err, result) => {
        if (err) {
            console.error('Error creating record:', err);
            res.status(500).send('Error creating record');
            return;
        }

        res.send(result);
    });
});

// Update an existing record
app.put('/records/:id', (req, res) => {
    const id = req.params.id;
    const { name, age } = req.body;

    connection.query('UPDATE my_table SET name = ?, age = ? WHERE id = ?', [name, age, id], (err, result) => {
        if (err) {
            console.error('Error updating record:', err);
            res.status(500).send('Error updating record');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Record not found');
            return;
        }

        res.send(result);
    });
});

// Delete a record
app.delete('/records/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM my_table WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            res.status(500).send('Error deleting record');
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).send('Record not found');
            return;
        }

        res.send(result);
    });
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));