const mongoose = require('mongoose');

const sessionNoteSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  patientEmail: { type: String, required: true },
  note: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const SessionNote = mongoose.model('SessionNote', sessionNoteSchema, 'sessionnotes');

module.exports = SessionNote;
