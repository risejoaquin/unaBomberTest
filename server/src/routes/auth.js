const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { postRegister, getVerify, postLogin } = require('../controllers/authController');

router.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], postRegister);

router.get('/verify/:token', getVerify);

router.post('/login', postLogin);

module.exports = router;
