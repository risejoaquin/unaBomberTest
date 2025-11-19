const express = require('express');
const router = express.Router();
const { postScore, getLeaderboard } = require('../controllers/gameController');
const authRequired = require('../middlewares/authRequired');

router.post('/score', authRequired, postScore);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
