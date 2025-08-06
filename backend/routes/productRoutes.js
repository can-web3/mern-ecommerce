const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductBySlug,
  getProductsByCategorySlug
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  validateCreateProduct,
  validateUpdateProduct
} = require('../validations/productValidation');

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Sadece resim dosyaları (jpg, jpeg, png, gif, webp) kabul edilir'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/getProductBySlug/:slug', getProductBySlug);
router.get('/getProductsByCategorySlug/:slug', getProductsByCategorySlug)
router.post('/', protect, admin, upload.single('image'), validateCreateProduct, createProduct);
router.patch('/:id', protect, admin, upload.single('image'), validateUpdateProduct, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
