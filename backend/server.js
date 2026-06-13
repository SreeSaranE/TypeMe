const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed');
        console.error(err);
        return;
    }

    console.log('MySQL Connected');
});

// Root Route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Get all stats
app.get('/stats/:username', (req, res) => {

    const username = req.params.username;

    db.query(
        'SELECT * FROM stats WHERE username = ? ORDER BY created_at',
        [username],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );

});

// Save a new stat
app.post('/stats', (req, res) => {

    const { username, wpm, accuracy } = req.body;

    console.log(req.body);

    db.query(
        'INSERT INTO stats (username, wpm, accuracy) VALUES (?, ?, ?)',
        [username, wpm, accuracy],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            res.json({
                message: 'Saved',
                id: result.insertId
            });

        }
    );

});

// Delete
app.delete('/stats/:username', (req, res) => {

    const username = req.params.username;

    db.query(
        'DELETE FROM stats WHERE username = ?',
        [username],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Stats deleted'
            });
        }
    );

});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});