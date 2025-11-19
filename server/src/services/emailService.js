const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
});

async function sendVerificationEmail(email, token) {
  const link = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify/${token}`;
  const html = `<p>Verifica tu correo con el siguiente enlace: <a href="${link}">${link}</a></p>`;
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM || 'no-reply@unabombeer.local',
      to: email,
      subject: 'Verifica tu cuenta - Unabombeer',
      html
    });
  } catch (err) {
    console.warn('Failed to send email (this may be expected in dev):', err.message);
  }
}

module.exports = { sendVerificationEmail };
