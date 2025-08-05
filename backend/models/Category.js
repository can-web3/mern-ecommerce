// models/Category.js
const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Kategori adı zorunludur'],
    unique: true
  },
  slug: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = model('Category', categorySchema);
