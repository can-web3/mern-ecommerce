// models/User.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'İsim zorunludur']
  },
  email: {
    type: String,
    required: [true, 'E‑posta zorunludur'],
    unique:   true,
    lowercase:true,
    match: [/\S+@\S+\.\S+/, 'Geçerli bir e‑posta giriniz']
  },
  password: {
    type: String,
    required: [true, 'Parola zorunludur']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = model('User', userSchema);
