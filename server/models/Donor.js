const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  bloodGroup: { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-'] },
  phone: String,
  city: String,
  role: { type: String, default: 'donor' },   // 'donor' or 'admin'
  lastDonationDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donor', donorSchema);