const express = require('express');
const router = express.Router();
const { getProfile, putProfile } = require('../controllers/userController');
const authRequired = require('../middlewares/authRequired');

router.get('/profile', authRequired, getProfile);
router.put('/profile', authRequired, putProfile);

module.exports = router;
