const Product = require('../models/Product');
const Category = require('../models/Category');
const { generateSlug } = require('../utils/slugify');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category', 'name').sort('-createdAt');
    res.json({ products });
  } catch (err) {
    next(err);
  }
};

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

exports.getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product
      .findOne({ slug: req.params.slug })
      .populate('category', 'name');
    if (!product) {
      return res.status(404).json({ errors: { general: 'Ürün bulunamadı' } });
    }
    res.json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getProductsByCategorySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOne({ slug });
    if (!category) {
      return res.status(404).json({ errors: { general: 'Kategori bulunamadı' } });
    }

    const products = await Product
      .find({ category: category._id })
      .populate('category', 'name slug');

    res.json({ category: category.name, products });
  } catch (err) {
    next(err);
  }
};

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
      inStock: inStock ? Number(inStock) : 0,
      slug: generateSlug(title)
    });
    res.status(201).json({ product });
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    // 1) Ürünü getir
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: { general: 'Ürün bulunamadı' } });
    }

    // 2) req.body.image'i atla, diğer tüm alanları ata
    Object.keys(req.body).forEach(key => {
      if (key === 'image') return;
      product[key] = req.body[key];
    });

    // 3) Başlık değiştiyse slug güncelle
    if (req.body.title) {
      product.slug = generateSlug(req.body.title);
    }

    // 4) Gerçek bir dosya geldiyse yalnızca o zaman resmi ata
    if (req.file) {
      product.image = `/uploads/${req.file.filename}`;
    }

    // 5) Kaydet
    const updated = await product.save();

    // 6) Döndür
    res.json({ product: updated });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: { general: 'Ürün bulunamadı' } });
    }
    res.json({ message: 'Ürün silindi' });
  } catch (err) {
    next(err);
  }
};
