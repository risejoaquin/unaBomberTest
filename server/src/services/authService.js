const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findByEmail, findById, setVerified } = require('../models/userModel');
const { createToken, findToken, deleteToken } = require('../models/tokenModel');
const { sendVerificationEmail } = require('./emailService');

async function register({ email, password, name }) {
  const existing = await findByEmail(email);
  if (existing) throw new Error('Email already in use');
  const hashed = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password: hashed, name });
  const token = require('crypto').randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
  await createToken({ user_id: user.id, token, expires_at: expires });
  await sendVerificationEmail(email, token);
  return user;
}

async function verifyEmail(token) {
  const rec = await findToken(token);
  if (!rec) throw new Error('Invalid token');
  if (new Date(rec.expires_at) < new Date()) { await deleteToken(rec.id); throw new Error('Token expired'); }
  await setVerified(rec.user_id);
  await deleteToken(rec.id);
  return true;
}

function createJWT(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

async function login({ email, password }) {
  const user = await findByEmail(email);
  if (!user) throw new Error('Invalid credentials');
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error('Invalid credentials');
  return { user, token: createJWT(user) };
}

module.exports = { register, verifyEmail, login, createJWT };
