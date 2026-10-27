const express = require('express');
const Donor = require('../models/Donor');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const router = express.Router();

// search donors: /api/donors/search?bloodGroup=O%2B&city=Pune
router.get('/search', async (req, res) => {
  const filter = { role: 'donor' };
  if (req.query.bloodGroup) filter.bloodGroup = req.query.bloodGroup;
  if (req.query.city) filter.city = new RegExp(req.query.city, 'i');
  const donors = await Donor.find(filter).select('-password');
  res.json(donors);
});

// my profile
router.get('/me', isLoggedIn, async (req, res) => {
  const donor = await Donor.findById(req.user.id).select('-password');
  res.json(donor);
});

// update my profile
router.put('/me', isLoggedIn, async (req, res) => {
  delete req.body.password;
  delete req.body.role;
  const donor = await Donor.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password');
  res.json(donor);
});

// admin: all donors
router.get('/', isLoggedIn, isAdmin, async (req, res) => {
  const donors = await Donor.find().select('-password');
  res.json(donors);
});

// admin: delete donor
router.delete('/:id', isLoggedIn, isAdmin, async (req, res) => {
  await Donor.findByIdAndDelete(req.params.id);
  res.json({ message: 'Donor deleted' });
});

module.exports = router;