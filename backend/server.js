const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const dotenv = require('dotenv')
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.log('Database connection failed');
        console.log(err);
        return;
    }

    console.log('MySQL Connected');
});

app.get('/stats', (req, res) => {

    db.query(
        'SELECT * FROM stats',
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }
            console.log(results);
            res.json(results);
        }
    );

});

app.post('/stats', (req, res) => {

    const { wpm, accuracy } = req.body;

    db.query(
        'INSERT INTO stats (wpm, accuracy) VALUES (?, ?)',
        [wpm, accuracy],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Saved',
                id: result.insertId
            });
        }
    );

});

app.getitem()
app.listen(3000, () => {
    console.log('Server running on port 3000');
});