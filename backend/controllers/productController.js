// controllers/productController.js
const Product  = require('../models/Product');
const Category = require('../models/Category');
const path     = require('path');

// GET /api/products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'name');
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) {
      return res.status(404).json({ errors: { general: 'Ürün bulunamadı' } });
    }
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

// POST /api/products
exports.createProduct = async (req, res, next) => {
  try {
    const { title, description, category, price, discountedPrice, inStock } = req.body;

    const cat = await Category.findById(category);
    if (!cat) {
      return res.status(400).json({ errors: { category: 'Geçersiz kategori ID' } });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const product = await Product.create({
      title,
      image: imagePath,
      description,
      category,
      price: Number(price),
      discountedPrice: discountedPrice ? Number(discountedPrice) : 0,
      inStock: inStock ? Number(inStock) : 0
    });

    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: { general: 'Ürün bulunamadı' } });
    }

    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({ product });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: { general: 'Ürün bulunamadı' } });
    }

    await product.remove();
    res.json({ message: 'Ürün silindi' });
  } catch (err) {
    next(err);
  }
};
