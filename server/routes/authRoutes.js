const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Donor = require('../models/Donor');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const exists = await Donor.findOne({ email: req.body.email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const hashed = await bcrypt.hash(req.body.password, 10);
    const donor = await Donor.create({ ...req.body, password: hashed, role: 'donor' });
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await Donor.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;