const { findById } = require('../models/userModel');

async function getProfile(req, res) {
  const user = await findById(req.user.id);
  res.json({ success: true, user });
}

async function putProfile(req, res) {
  // Minimal update sample
  res.json({ success: true, message: 'Profile update endpoint (implement as needed)' });
}

module.exports = { getProfile, putProfile };
