// server.js
require('dotenv').config();
const express        = require('express');
const connectDB      = require('./config/db');
const userRoutes     = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes  = require('./routes/productRoutes');
const errorHandler   = require('./middleware/errorHandler');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

app.use('/api/users',      userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products',   productRoutes);

app.use((req, res) => {
  res.status(404).json({
    errors: {
      general: `Route ${req.method} ${req.originalUrl} bulunamadı`
    }
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
