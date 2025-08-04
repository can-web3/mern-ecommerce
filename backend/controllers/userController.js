const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res, next) => {
  try {
    // e‑posta kontrolü
    if (await User.findOne({ email: req.body.email })) {
      return res.status(409).json({
        errors: { email: 'E‑posta daha önce alınmış' }
      });
    }

    // hash
    const hashed = await bcrypt.hash(req.body.password, 10);

    // kullanıcı oluştur
    const user = await User.create({
      name:     req.body.name,
      email:    req.body.email,
      password: hashed,
      isAdmin:  false
    });

    // token üret
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // cevap
    res.status(201).json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      token
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        errors: { general: 'E‑posta veya parola hatalı' }
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({
        errors: { general: 'E‑posta veya parola hatalı' }
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      _id:   user._id,
      name:  user.name,
      email: user.email,
      token
    });
  } catch (err) {
    next(err);
  }
};
