// models/Product.js
const { Schema, model } = require('mongoose');
const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Başlık zorunludur']
  },
  image: {
    type: String,
    required: [
      function() { return this.isNew; },
      'Resim URL’si zorunludur'
    ],
    get: v => `${BASE_URL}${v}`
  },
  description: { type: String, default: '' },
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
  },
  slug: {
    type: String,
    required: [true, 'Slug zorunludur']
  }
}, {
  timestamps: true,
  toJSON:   { getters: true, virtuals: false },
  toObject: { getters: true, virtuals: false }
});

productSchema.virtual('imageUrl').get(function() {
  return `${BASE_URL}${this.image}`;
});

module.exports = model('Product', productSchema);
