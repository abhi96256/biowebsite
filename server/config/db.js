const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'gullygang123!',
    database: process.env.DB_NAME || 'ias_website',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

module.exports = { pool, dbConfig, JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production' };
