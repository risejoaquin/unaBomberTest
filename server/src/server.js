const app = require('./app');
const { initDB } = require('./database');
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
