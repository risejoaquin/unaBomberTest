const { getPool } = require('../database');

async function createUser({ email, password, name }) {
  const pool = getPool();
  const [result] = await pool.query('INSERT INTO users (email, password, name) VALUES (?, ?, ?)', [email, password, name]);
  return { id: result.insertId, email, name };
}

async function findByEmail(email) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

async function findById(id) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT id, email, name, verified, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
}

async function setVerified(userId) {
  const pool = getPool();
  await pool.query('UPDATE users SET verified = 1 WHERE id = ?', [userId]);
}

module.exports = { createUser, findByEmail, findById, setVerified };
