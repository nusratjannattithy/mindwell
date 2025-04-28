const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
