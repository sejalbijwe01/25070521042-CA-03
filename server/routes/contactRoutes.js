const express = require('express');
const Contact = require('../models/Contact');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/', async (req, res) => {
  await Contact.create(req.body);
  res.status(201).json({ message: 'Message sent' });
});

router.get('/', isLoggedIn, isAdmin, async (req, res) => {
  res.json(await Contact.find().sort({ createdAt: -1 }));
});

module.exports = router;