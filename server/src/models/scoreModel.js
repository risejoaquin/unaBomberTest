const { getPool } = require('../database');

async function saveScore({ user_id, score, mode }) {
  const pool = getPool();
  const [res] = await pool.query('INSERT INTO scores (user_id, score) VALUES (?, ?)', [user_id || null, score]);
  await pool.query('INSERT INTO matches (user_id, mode, score) VALUES (?, ?, ?)', [user_id || mode, mode, score]);
  return res.insertId;
}

async function getLeaderboard(limit = 50) {
  const pool = getPool();
  const [rows] = await pool.query('SELECT u.id user_id, u.name, u.email, SUM(s.score) total_score FROM users u JOIN scores s ON s.user_id = u.id GROUP BY u.id ORDER BY total_score DESC LIMIT ?', [limit]);
  return rows;
}

module.exports = { saveScore, getLeaderboard };
