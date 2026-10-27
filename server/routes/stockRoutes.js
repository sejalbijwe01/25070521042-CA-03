const express = require('express');
const Stock = require('../models/Stock');
const { isLoggedIn, isAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json(await Stock.find());
});

// admin: set units for a blood group (creates it if it doesn't exist)
router.put('/:bloodGroup', isLoggedIn, isAdmin, async (req, res) => {
  const stock = await Stock.findOneAndUpdate(
    { bloodGroup: req.params.bloodGroup },
    { units: req.body.units },
    { new: true, upsert: true }
  );
  res.json(stock);
});

module.exports = router;