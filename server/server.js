const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const { initializeDatabase } = require('./seed/initialize');
const { uploadsDir } = require('./middleware/upload');
const authRoutes = require('./routes/auth.routes');
const contentRoutes = require('./routes/content.routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '2mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadsDir));

app.get('/api/health', (req, res) => {
    res.json({ ok: true, service: 'ias-website-cms' });
});

app.use('/api', authRoutes);
app.use('/api/content', contentRoutes);

initializeDatabase()
    .then(() => {
        console.log('Connected to MySQL database');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log('CMS sections: /api/content/sections');
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });
