// models/therapist.js

const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  userType: { type: String, required: true },
  documents: {
    profilePhoto: { type: String, default: "" }
  }
});

module.exports = mongoose.model('Therapist', therapistSchema);
