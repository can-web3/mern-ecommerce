// server.js
require('dotenv').config();
const express        = require('express');
const cors           = require('cors');              // ← CORS eklendi
const connectDB      = require('./config/db');
const userRoutes     = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes  = require('./routes/productRoutes');
const errorHandler   = require('./middleware/errorHandler');

const app = express();

// 1) MongoDB bağlantısı
connectDB();

// 2) Orijin tanımlı CORS ayarları
app.use(cors({
  origin: process.env.BASE_URL || 'http://localhost:5000', // React uygulamanın adresi
  // credentials: true,             // eğer cookie ile auth kullanacaksan uncomment et
}));

// 3) Body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4) Statik dosya servisi (ör. uploads klasörü)
app.use('/uploads', express.static('uploads'));

// 5) API rotaları
app.use('/api/users',      userRoutes);
app.use('/api/admin/categories', categoryRoutes);
app.use('/api/admin/products',   productRoutes);

// 6) 404 handler
app.use((req, res) => {
  res.status(404).json({
    errors: {
      general: `Route ${req.method} ${req.originalUrl} bulunamadı`
    }
  });
});

// 7) Global error handler
app.use(errorHandler);

// 8) Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
