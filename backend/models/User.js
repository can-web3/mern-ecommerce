// models/User.js
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Kullanıcı adı boş bırakılamaz']
  },
  email: {
    type: String,
    required: [true, 'E‑posta boş bırakılamaz'],
    unique:   true,
    lowercase:true,
    match: [/\S+@\S+\.\S+/, 'Geçerli bir e‑posta giriniz']
  },
  password: {
    type: String,
    required: [true, 'Parola boş bırakılamaz']
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = model('User', userSchema);
