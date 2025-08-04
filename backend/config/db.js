// config/db.js
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('../models/User');

async function ensureAdmin() {
  const adminEmail    = "admin@gmail.com";
  const adminName     = "Admin";
  const adminPassword = "admin1";
  const exists = await User.findOne({ email: adminEmail, isAdmin: true });
  if (!exists) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name:     adminName,
      email:    adminEmail,
      password: hashed,
      isAdmin:  true
    });
    console.log(`🔐 Admin oluşturuldu: ${adminEmail}`);
  }
}

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  });
  console.log('✔️ MongoDB bağlandı');
  await ensureAdmin();
}

module.exports = connectDB;
