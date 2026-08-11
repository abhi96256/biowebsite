const mysql = require('mysql2/promise');

const dbHost = process.env.DB_HOST || 'localhost';
const isTiDBCloud = dbHost.includes('tidbcloud.com');
const useSsl = process.env.DB_SSL === 'true' || isTiDBCloud;

const sslConfig = useSsl
    ? {
          minVersion: 'TLSv1.2',
          // TiDB Cloud certificate verification can be toggled via env
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true'
      }
    : undefined;

if (sslConfig && process.env.DB_SSL_CA) {
    // Support multiline cert passed via env variable
    sslConfig.ca = process.env.DB_SSL_CA.replace(/\\n/g, '\n');
}

const dbConfig = {
    host: dbHost,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'gullygang123!',
    database: process.env.DB_NAME || 'ias_website',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    // TiDB public endpoint requires TLS
    ssl: sslConfig
};

const pool = mysql.createPool(dbConfig);

module.exports = { pool, dbConfig, JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production' };
