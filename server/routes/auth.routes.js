const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool, JWT_SECRET } = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
});

// Verify token for admin gate (login required before CMS)
router.get('/me', authenticateToken, (req, res) => {
    res.json({ ok: true, user: { id: req.user.id, username: req.user.username } });
});

module.exports = router;
