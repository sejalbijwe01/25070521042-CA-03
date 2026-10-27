const express = require('express');
const Camp = require('../models/Camp');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await Camp.find().sort({ date: 1 }));
});

router.post('/', isLoggedIn, isAdmin, async (req, res) => {
  res.status(201).json(await Camp.create(req.body));
});

router.put('/:id', isLoggedIn, isAdmin, async (req, res) => {
  res.json(await Camp.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

router.delete('/:id', isLoggedIn, isAdmin, async (req, res) => {
  await Camp.findByIdAndDelete(req.params.id);
  res.json({ message: 'Camp deleted' });
});

module.exports = router;