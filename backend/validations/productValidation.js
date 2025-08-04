// validations/productValidation.js
const Joi = require('joi');
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const base = {
  title: Joi.string()
    .required()
    .messages({
      'any.required': 'Başlık zorunludur',
      'string.empty': 'Başlık boş bırakılamaz'
    }),
  description: Joi.string()
    .allow('')
    .messages({
      'string.base': 'Açıklama metin olmalıdır'
    }),
  category: Joi.string().pattern(objectIdPattern)
    .required()
    .messages({
      'any.required': 'Kategori ID zorunludur',
      'string.empty': 'Kategori ID boş bırakılamaz',
      'string.pattern.base': 'Geçerli bir Kategori ID giriniz'
    }),
  price: Joi.number().min(0)
    .required()
    .messages({
      'any.required': 'Fiyat zorunludur',
      'number.base':  'Fiyat bir sayı olmalıdır',
      'number.min':   'Fiyat negatif olamaz'
    }),
  discountedPrice: Joi.number().min(0)
    .messages({
      'number.base': 'İndirimli fiyat bir sayı olmalıdır',
      'number.min':  'İndirimli fiyat negatif olamaz'
    }),
  inStock: Joi.number().integer().min(0)
    .messages({
      'number.base':    'Stok bir sayı olmalıdır',
      'number.integer': 'Stok tam sayı olmalıdır',
      'number.min':     'Stok negatif olamaz'
    })
};

const createSchema = Joi.object(base).custom((obj, helpers) => {
  if (obj.discountedPrice !== undefined && obj.discountedPrice > obj.price) {
    return helpers.message('İndirimli fiyat, normal fiyattan yüksek olamaz');
  }
  return obj;
});

const updateSchema = Joi.object({
  title:           base.title.optional(),
  description:     base.description,
  category:        base.category.optional(),
  price:           base.price.optional(),
  discountedPrice: base.discountedPrice.optional(),
  inStock:         base.inStock.optional()
}).custom((obj, helpers) => {
  if (
    obj.discountedPrice !== undefined &&
    obj.price !== undefined &&
    obj.discountedPrice > obj.price
  ) {
    return helpers.message('İndirimli fiyat, normal fiyattan yüksek olamaz');
  }
  return obj;
});

function validateCreateProduct(req, res, next) {
  const errors = {};

  // 1) Resim dosyasını kontrol et
  if (!req.file) {
    errors.image = 'Resim dosyası zorunludur';
  }

  // 2) Body validasyonu
  const { error } = createSchema.validate(req.body, { abortEarly: false });
  if (error) {
    error.details.forEach(d => {
      const key = d.path[0];
      if (!errors[key]) {
        errors[key] = d.message;
      }
    });
  }

  // 3) Hata varsa topluca dön
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

function validateUpdateProduct(req, res, next) {
  const errors = {};

  // 1) Eğer yeni bir dosya gelmişse, tipi opsiyonel olarak kontrol edebilirsin
  // (isteğe bağlı)

  // 2) Body validasyonu
  const { error } = updateSchema.validate(req.body, { abortEarly: false });
  if (error) {
    error.details.forEach(d => {
      const key = d.path[0];
      if (!errors[key]) {
        errors[key] = d.message;
      }
    });
  }

  // 3) Hata varsa topluca dön
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

module.exports = {
  validateCreateProduct,
  validateUpdateProduct
};
