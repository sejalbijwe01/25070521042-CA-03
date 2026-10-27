const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  units: { type: Number, required: true },
  hospital: String,
  city: String,
  contact: String,
  urgent: { type: Boolean, default: false },
  status: { type: String, default: 'Pending' },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Donor' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Request', requestSchema);