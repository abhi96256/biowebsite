const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { getAllSeedRows } = require('../sections');

async function initializeDatabase() {
    try {
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS content (
                id INT AUTO_INCREMENT PRIMARY KEY,
                section VARCHAR(100) NOT NULL,
                \`key\` VARCHAR(100) NOT NULL,
                value TEXT,
                image_url VARCHAR(500),
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY unique_section_key (section, \`key\`)
            )
        `);

        const defaultPassword = bcrypt.hashSync('admin123', 10);
        await pool.execute(
            'INSERT IGNORE INTO users (username, password) VALUES (?, ?)',
            ['admin', defaultPassword]
        );

        const rows = getAllSeedRows();
        // Only insert missing keys — never overwrite admin edits on restart
        const insertStmt = `INSERT IGNORE INTO content (section, \`key\`, value, image_url) VALUES (?, ?, ?, ?)`;
        for (const item of rows) {
            await pool.execute(insertStmt, item);
        }

        console.log(`Database initialized — seeded ${rows.length} content fields across sections`);
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

module.exports = { initializeDatabase };
