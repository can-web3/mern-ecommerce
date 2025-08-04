const router               = require('express').Router();
const registerValidate     = require('../validations/auth/registerValidation');
const loginValidate        = require('../validations/auth/loginValidation');
const { register, login }  = require('../controllers/userController');

router.post('/register', registerValidate, register);
router.post('/login',    loginValidate,    login);

module.exports = router;
