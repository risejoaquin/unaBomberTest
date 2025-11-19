const mysql = require('mysql2/promise');
// Agregamos dotenv por si quieres probar en local con un archivo .env
require('dotenv').config();

let pool;

async function initDB() {
  // Configuración corregida para usar las variables DB_... de Railway
  pool = mysql.createPool({
    host: process.env.DB_HOST,           // Antes era MYSQL_HOST
    user: process.env.DB_USER,           // Antes era MYSQL_USER
    password: process.env.DB_PASSWORD,   // Antes era MYSQL_PASSWORD
    database: process.env.DB_NAME,       // Antes era MYSQL_DATABASE
    port: process.env.DB_PORT || 3306,   // Antes era MYSQL_PORT
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    // create minimal tables if not exists
    const conn = await pool.getConnection();
    console.log('¡Conexión a la base de datos exitosa!'); // Log para confirmar conexión

    await conn.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255),
      verified TINYINT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await conn.query(`CREATE TABLE IF NOT EXISTS verification_tokens (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      token VARCHAR(255) NOT NULL,
      expires_at DATETIME,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
    await conn.query(`CREATE TABLE IF NOT EXISTS matches (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      mode VARCHAR(50),
      score INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )`);
    await conn.query(`CREATE TABLE IF NOT EXISTS scores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      score INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`);
    await conn.query(`CREATE TABLE IF NOT EXISTS items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      type VARCHAR(100),
      data JSON
    )`);
    await conn.query(`CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      item_id INT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    conn.release();
  } catch (error) {
    console.error('Error al conectar o inicializar la BD:', error);
    // Es importante lanzar el error para saber si falló
    throw error;
  }
}

function getPool() {
  if (!pool) throw new Error('DB not initialized');
  return pool;
}

module.exports = { initDB, getPool };