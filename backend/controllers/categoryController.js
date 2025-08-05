// controllers/categoryController.js
const { default: slugify } = require('slugify');
const Category = require('../models/Category');
const { generateSlug } = require('../utils/slugify');

// @desc    Tüm kategorileri listele
// @route   GET /api/categories
// @access  Admin
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort('-createdAt');
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

// @desc    Yeni kategori oluştur
// @route   POST /api/categories
// @access  Admin
exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(422).json({
        errors: { name: 'Kategori adı zorunludur' }
      });
    }

    const exists = await Category.findOne({ name });
    if (exists) {
      return res.status(422).json({
        errors: { name: 'Bu kategori zaten mevcut' }
      });
    }

    const slug = generateSlug(name)

    const category = await Category.create({ name, slug });

    res.status(201).json({
      _id:  category._id,
      name: category.name
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Tek kategori getir
// @route   GET /api/categories/:id
// @access  Admin
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        errors: { general: 'Kategori bulunamadı' }
      });
    }
    res.json({
      _id:  category._id,
      name: category.name
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Kategoriyi güncelle
// @route   PUT /api/categories/:id
// @access  Admin
exports.updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        errors: { name: 'Kategori adı zorunludur' }
      });
    }

    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        errors: { general: 'Kategori bulunamadı' }
      });
    }

    category.name = name;
    await category.save();

    res.json({
      _id:  category._id,
      name: category.name,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Kategoriyi sil
// @route   DELETE /api/categories/:id
// @access  Admin
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        errors: { general: 'Kategori bulunamadı' }
      });
    }

    await category.deleteOne();

    res.json({
      message: 'Kategori silindi'
    });
  } catch (err) {
    next(err);
  }
};
