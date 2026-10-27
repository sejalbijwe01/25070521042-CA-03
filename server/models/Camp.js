const mongoose = require('mongoose');
const campSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: Date,
  venue: String,
  city: String,
  description: String
});
module.exports = mongoose.model('Camp', campSchema);