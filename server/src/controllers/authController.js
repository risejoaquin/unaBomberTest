const { register, verifyEmail, login } = require('../services/authService');
const { validationResult } = require('express-validator');

async function postRegister(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password, name } = req.body;
    const user = await register({ email, password, name });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getVerify(req, res) {
  try {
    const token = req.params.token;
    await verifyEmail(token);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function postLogin(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await login({ email, password });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ success: true, user: { id: user.id, email: user.email, name: user.name }});
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { postRegister, getVerify, postLogin };
