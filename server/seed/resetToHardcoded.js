/**
 * Wipe content table and insert only current section seed fields
 * (exactly what the frontend uses as defaults).
 * Usage: node seed/resetToHardcoded.js
 */
const { pool } = require('../config/db');
const { getAllSeedRows } = require('../sections');

async function reset() {
    await pool.execute('DELETE FROM content');

    const rows = getAllSeedRows();
    const stmt = 'INSERT INTO content (section, `key`, value, image_url) VALUES (?, ?, ?, ?)';
    for (const item of rows) {
        await pool.execute(stmt, item);
    }

    const [counts] = await pool.execute(
        'SELECT section, COUNT(*) AS n FROM content GROUP BY section ORDER BY section'
    );
    console.log(`Reset complete — ${rows.length} fields`);
    console.table(counts);

    const [about] = await pool.execute(
        'SELECT `key`, LEFT(IFNULL(value, ""), 70) AS value, image_url FROM content WHERE section = ?',
        ['about']
    );
    console.log('About:');
    console.table(about);

    await pool.end();
}

reset().catch((err) => {
    console.error(err);
    process.exit(1);
});
