const { submitScore, leaderboard } = require('../services/gameService');

async function postScore(req, res) {
  try {
    const { score, mode } = req.body;
    const user_id = req.user ? req.user.id : null;
    await submitScore({ user_id, score, mode });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getLeaderboard(req, res) {
  try {
    const list = await leaderboard(50);
    res.json({ success: true, data: list });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { postScore, getLeaderboard };
