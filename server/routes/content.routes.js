const express = require('express');
const { pool } = require('../config/db');
const { authenticateToken } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { getSectionList } = require('../sections');

const router = express.Router();

function optionalImageUpload(req, res, next) {
    const ct = req.headers['content-type'] || '';
    if (ct.includes('multipart/form-data')) {
        return upload.single('image')(req, res, next);
    }
    return next();
}

async function updateContentById(req, res) {
    const numericId = Number(req.params.id);
    if (!Number.isFinite(numericId)) {
        return res.status(400).json({ error: 'Invalid content id' });
    }

    const { value } = req.body;
    let imageUrl;
    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.image === '') {
        imageUrl = null;
    } else if (req.body.image === undefined) {
        imageUrl = undefined;
    }

    try {
        let query;
        let params;
        if (imageUrl !== undefined) {
            query = 'UPDATE content SET value = ?, image_url = ? WHERE id = ?';
            params = [value ?? null, imageUrl, numericId];
        } else {
            query = 'UPDATE content SET value = ? WHERE id = ?';
            params = [value ?? null, numericId];
        }

        const [result] = await pool.execute(query, params);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Content not found' });
        }
        res.json({ message: 'Content updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

router.get('/sections', (req, res) => {
    res.json(getSectionList());
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM content ORDER BY section, `key`');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Upload image for list items (blog, testimonials, gallery, leadership…)
router.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image uploaded' });
    }
    res.json({ url: `/uploads/${req.file.filename}` });
});

router.get('/:section', async (req, res) => {
    const { section } = req.params;
    try {
        const [rows] = await pool.execute('SELECT * FROM content WHERE section = ? ORDER BY `key`', [section]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/item/:id', authenticateToken, optionalImageUpload, updateContentById);
router.put('/:id', authenticateToken, optionalImageUpload, updateContentById);

router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
    const { section, key, value } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        await pool.execute(
            'INSERT INTO content (section, `key`, value, image_url) VALUES (?, ?, ?, ?)',
            [section, key, value, imageUrl]
        );
        res.json({ message: 'Content created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        await pool.execute('DELETE FROM content WHERE id = ?', [id]);
        res.json({ message: 'Content deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
