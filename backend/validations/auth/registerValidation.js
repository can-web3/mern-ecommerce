const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'İsim alanı zorunludur',
    'string.empty':  'İsim alanı boş bırakılamaz'
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'E‑posta alanı zorunludur',
    'string.empty':  'E‑posta alanı boş bırakılamaz',
    'string.email':  'Geçerli bir e‑posta giriniz'
  }),
  password: Joi.string().min(6).required().messages({
    'any.required': 'Parola alanı zorunludur',
    'string.empty':  'Parola alanı boş bırakılamaz',
    'string.min':    'Parola en az 6 karakter olmalıdır'
  }),
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
