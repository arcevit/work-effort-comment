const url = `mongodb://localhost:27017/work-effort`;
const mongoose = require('mongoose');

async function connectDB() {
  try {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', (error) => console.error(error));
    db.once('open', () => console.log('Connected to Database'));
    return db;
  } catch (error) {
    console.info('whats problem', error);
  }
}

module.exports.connectDB = connectDB;
