const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your-secret-key-change-in-production';

// MySQL Database Configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'gullygang123!', // Update with your MySQL password if you have one
    database: 'ias_website', // Create this database in MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Images only!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Initialize database tables
async function initializeDatabase() {
    try {
        // Create users table for admin authentication
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create content table for storing website content
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

        // Create default admin user (username: admin, password: admin123)
        const defaultPassword = bcrypt.hashSync('admin123', 10);
        await pool.execute(
            'INSERT IGNORE INTO users (username, password) VALUES (?, ?)',
            ['admin', defaultPassword]
        );

        // Insert default content based on current website
        const defaultContent = [
            // Hero section
            ['hero', 'title', 'Shri Rajesh Kumar, IAS (Retd.)', null],
            ['hero', 'subtitle', 'Former Chief Secretary, Government of Haryana', null],
            ['hero', 'description', 'Four decades of public service dedicated to transparent governance, institutional reform, and citizen welfare.', null],
            ['hero', 'badge', 'Honoring 40 Years of Service', null],
            ['hero', 'button1', 'Explore Journey', null],
            ['hero', 'button2', 'Archive Access', null],
            ['hero', 'main_image', null, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgY8eEo9Ip8kDTGKz2UDWfNO6UPNS7-N_99hZ3LMI2yUzxeu5eKjjUS9faV7Uuu8QaOh_cmZweQBtcp2ZcFGW3ahbmMEc5MYSHV90rzA8S6MG4pi4acf4UUlKoRU5UivzVBMfk9Gba2tJme0WXJY3czkEY3bAymkoX4KXLxFVOxfDSgRe4aT6SRnJ_E0j5VUmAxeNateHJdA3Lh2RhuUR7wWP6MJ3VIt6w1qsvpeFLwaX0zO7u76cj'],
            ['hero', 'sub_image', null, 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVySLZksoWa4HvVOLKsYEJgTe_gP9aFdGDXgz8lQNz6g_IACrZraplcoswQaVJz1fDOEwyO8lcPL6792Vgiykade4mDWhF2Any9oDpff8A5omUA-i6QMStVmLG1epgy1YnJ2GnV_DzzaxRUKYZmHm-7uG70bgmktUW05jobWhqyLo2WUksh5-PNA7lbqCeBrCyxMXbeW95UWIZUSAfNbX8wh0k4PGp1YkPZU-GtKKEBWSBbQE8DbVR'],
            ['hero', 'background_image', null, 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy6Yyh4RipAoL3A8rKtiEhBp51AuDk4UTIWwwfpRkzY1ZEojDUV2gNa2cr0WDLM-x-Ba60Gi2KvjADvlMJUKNpWuEwE-J3NHSrXAKy1nVv3ZQCKztHhL8onJIBTa4OaWqQVGf7bQsQGUwwlIkNKUZQ5eIiOd5N8P7oyOYHd_4lshBkMQmK5IxjP2RoJjRLIjOHp4n01-8m3bI0GrLkVoIBIut7bmDQvM8hUEnw6csMaYnnGcb5NP44'],
            
            // About section
            ['about', 'title', 'A Life Defined by Integrity and Curiosity', null],
            ['about', 'label', 'The Man Behind the Officer', null],
            ['about', 'paragraph1', 'Beyond the formal corridors of power, Rajesh Kumar is a scholar of Indian history and a patron of the arts. Born into a family of educators, the values of discipline and service were instilled early. His journey into the civil services wasn\'t merely a career choice, but a calling to address the systemic challenges he witnessed in rural India.', null],
            ['about', 'paragraph2', 'Known for his "open door" policy, he spent his weekends visiting village councils without security, listening to the unspoken needs of the community. His approach to administration is deeply human—balancing the rigidity of law with the flexibility of empathy.', null],
            ['about', 'image', null, 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTcq88qpVOZi7bJE9cKoEyFWoH0cmtlpSO9hZJ4wUA_MTXlqT3-GMr0nadVS6PPqmy0T6dQp1QXiYHzWNgljYgcOnloKhNx_w7VGRZZRWWUFrk8nf-aVj1wBhc_AyvPJB-0Rd53LUnCPQJvx1guQs01hsFBsEd5JpBT1wuTC60IEPBVtglLJ1ZmRsT-3DyUFGCrn1c-8OhawxaATL1AhHrA2YqKAu_peCe7_5v7MWF34hKvT4UwcEG'],
            ['about', 'signature', null, 'https://lh3.googleusercontent.com/aida-public/AB6AXuANfeiZnU1aFqcxLg-3uioR8DKq6QHsc4bcUaMiqwf9ptvb8Kdu1rucy5hMSgeBLcH2ChLJ6kfgNxUOqz4-qtvJI7e0xdUTmk4PJY8UT-3__Ww3MABJo_UzM-8X8vxoOOHijt0TQl18XluZXqSWrqH235PpUs9xTZzqmVq8eIJwHPXFK49HVZkbyCp9bSdAGMvbK8oTtkJzu9EPmXz2XpqvND_Y_zmIYsWZyTbsvc-V14A4fqrMcqrT'],
        ];

        const insertStmt = `INSERT IGNORE INTO content (section, \`key\`, value, image_url) VALUES (?, ?, ?, ?)`;
        for (const item of defaultContent) {
            await pool.execute(insertStmt, item);
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Initialize database on startup
initializeDatabase().then(() => {
    console.log('Connected to MySQL database');
}).catch(err => {
    console.error('Database connection failed:', err);
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }
        req.user = user;
        next();
    });
}

// Auth routes
app.post('/api/login', async (req, res) => {
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

// Content routes
app.get('/api/content', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM content');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/content/:section', async (req, res) => {
    const { section } = req.params;
    try {
        const [rows] = await pool.execute('SELECT * FROM content WHERE section = ?', [section]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/content/:id', authenticateToken, upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;
    
    // Handle image: new file, empty string (remove), or keep existing
    let imageUrl;
    if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.image === '') {
        imageUrl = null; // Remove image
    } else if (req.body.image === undefined) {
        // No image change, keep existing
        imageUrl = undefined;
    }

    try {
        let query, params;
        if (imageUrl !== undefined) {
            query = 'UPDATE content SET value = ?, image_url = ? WHERE id = ?';
            params = [value, imageUrl, id];
        } else {
            query = 'UPDATE content SET value = ? WHERE id = ?';
            params = [value, id];
        }

        await pool.execute(query, params);
        res.json({ message: 'Content updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/content', authenticateToken, upload.single('image'), async (req, res) => {
    const { section, key, value } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        await pool.execute(
            'INSERT INTO content (section, key, value, image_url) VALUES (?, ?, ?, ?)',
            [section, key, value, imageUrl]
        );
        res.json({ message: 'Content created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/content/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    
    try {
        await pool.execute('DELETE FROM content WHERE id = ?', [id]);
        res.json({ message: 'Content deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
