const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getStats() {
    const [rows] = await pool.query(
        "SELECT * FROM stats;"
    );
    return rows;
};

async function getStat(id) {
    const [row] = await pool.query(
        "SELECT * FROM stats WHERE id = ?",
        [id]
    )
    return row;
};

module.exports = {
    getStat,
    getStats
};