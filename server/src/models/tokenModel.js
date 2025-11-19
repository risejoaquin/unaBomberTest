const { getPool } = require('../database');

async function createToken({ user_id, token, expires_at }) {
  const pool = getPool();
  const [res] = await pool.query('INSERT INTO verification_tokens (user_id, token, expires_at) VALUES (?, ?, ?)', [user_id, token, expires_at]);
  return res.insertId;
}

async function findToken(token) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM verification_tokens WHERE token = ?', [token]);
  return rows[0];
}

async function deleteToken(id) {
  const pool = getPool();
  await pool.query('DELETE FROM verification_tokens WHERE id = ?', [id]);
}

module.exports = { createToken, findToken, deleteToken };
