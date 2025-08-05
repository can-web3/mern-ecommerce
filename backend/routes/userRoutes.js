const router               = require('express').Router();
const registerValidate     = require('../validations/auth/registerValidation');
const loginValidate        = require('../validations/auth/loginValidation');
const { register, login, user }  = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerValidate, register);
router.post('/login',    loginValidate,    login);
router.get('/user', protect, user);

module.exports = router;
