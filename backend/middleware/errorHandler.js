// middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  console.error(err);  // konsolda gerçek hatayı görebilirsin
  const status = err.statusCode || 500;
  res.status(status).json({
    errors: { general: err.message || 'Bir hata oluştu' }
  });
};
