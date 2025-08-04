// routes/categoryRoutes.js
const router = require('express').Router();
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect, admin);  // Aşağıdaki tüm rotaları önce koru, sonra admin onayı

router.get('/',        getCategories);
router.post('/',       createCategory);
router.get('/:id',     getCategoryById);
router.put('/:id',     updateCategory);
router.delete('/:id',  deleteCategory);

module.exports = router;
