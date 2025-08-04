// validations/auth/loginValidation.js
const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.empty': 'E‑posta alanı boş bırakılamaz',
      'string.email': 'Geçerli bir e‑posta giriniz'
    }),
  password: Joi.string()
    .required()
    .messages({ 'string.empty': 'Parola alanı boş bırakılamaz' }),
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = {};
    error.details.forEach(d => {
      const key = d.path[0];
      if (!errors[key]) errors[key] = d.message;
    });
    return res.status(400).json({ errors });
  }
  next();
};
