/**
 * Optional one-time sync: push section seed values into DB (overwrites existing).
 * Usage: node seed/syncFromFiles.js
 */
const { pool } = require('../config/db');
const { getAllSeedRows } = require('../sections');

async function sync() {
    const rows = getAllSeedRows();
    const stmt = `
        INSERT INTO content (section, \`key\`, value, image_url)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            value = VALUES(value),
            image_url = COALESCE(VALUES(image_url), image_url)
    `;
    for (const item of rows) {
        await pool.execute(stmt, item);
    }
    console.log(`Synced ${rows.length} fields from section files into DB`);
    await pool.end();
}

sync().catch((err) => {
    console.error(err);
    process.exit(1);
});
