// routes/productRoutes.js
const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  validateCreateProduct,
  validateUpdateProduct
} = require('../validations/productValidation');

// Multer konfigürasyonu
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (['.jpg','.jpeg','.png','.gif'].includes(ext)) cb(null, true);
  else cb(new Error('Sadece resim dosyaları (jpg, png, gif) kabul edilir'), false);
};
const upload = multer({ storage, fileFilter });

// Tüm ürün rotaları: önce kimlik sonra admin
router.use(protect, admin);

router.get('/',             getProducts);
router.get('/:id',          getProductById);
router.post('/',            upload.single('image'), validateCreateProduct, createProduct);
router.put('/:id',          upload.single('image'), validateUpdateProduct, updateProduct);
router.delete('/:id',       deleteProduct);

module.exports = router;
