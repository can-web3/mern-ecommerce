// models/Product.js
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Başlık zorunludur']
  },
  image: {
    type: String,
    required: [true, 'Resim URL’si zorunludur']
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Kategori ID zorunludur']
  },
  price: {
    type: Number,
    required: [true, 'Fiyat zorunludur'],
    min: [0, 'Fiyat negatif olamaz']
  },
  discountedPrice: {
    type: Number,
    default: 0,
    min: [0, 'İndirimli fiyat negatif olamaz']
  },
  inStock: {
    type: Number,
    default: 0,
    min: [0, 'Stok negatif olamaz']
  }
}, {
  timestamps: true
});

module.exports = model('Product', productSchema);
