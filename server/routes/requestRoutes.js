const express = require('express');
const Request = require('../models/Request');
const Stock = require('../models/Stock');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.post('/', isLoggedIn, async (req, res) => {
  const request = await Request.create({ ...req.body, requestedBy: req.user.id });
  res.status(201).json(request);
});

router.get('/my', isLoggedIn, async (req, res) => {
  res.json(await Request.find({ requestedBy: req.user.id }).sort({ createdAt: -1 }));
});

router.get('/', isLoggedIn, isAdmin, async (req, res) => {
  res.json(await Request.find().sort({ createdAt: -1 }));
});

// admin: approve or reject
router.put('/:id/status', isLoggedIn, isAdmin, async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (!request) return res.status(404).json({ message: 'Request not found' });

  if (req.body.status === 'Approved') {
    const stock = await Stock.findOne({ bloodGroup: request.bloodGroup });
    if (!stock || stock.units < request.units)
      return res.status(400).json({ message: 'Not enough stock' });
    stock.units -= request.units;
    await stock.save();
  }
  request.status = req.body.status;
  await request.save();
  res.json(request);
});

module.exports = router;