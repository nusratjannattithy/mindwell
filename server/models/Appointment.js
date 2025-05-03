const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  type: String,
  selectedDate: String,
  selectedTime: String,
  remarks: String,
  consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant' },
  branch: String,
  fee: Number
});

const Appointment = mongoose.model('Appointment', appointmentSchema, 'appointments');

module.exports = Appointment;
