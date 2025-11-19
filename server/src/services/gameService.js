const { saveScore, getLeaderboard } = require('../models/scoreModel');

async function submitScore({ user_id, score, mode }) {
  return await saveScore({ user_id, score, mode });
}

async function leaderboard(limit) {
  return await getLeaderboard(limit);
}

module.exports = { submitScore, leaderboard };
