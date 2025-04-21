const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userType: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String },
  phone: { type: String },
  gender: { type: String },
  birthdate: { type: String },
  specialization: { type: String },
  licenseNumber: { type: String },
  experience: { type: String },
  documents: {
    educationalCertificates: { type: String },
    resume: { type: String },
    governmentID: { type: String },
    consentForm: { type: String },
    specializationCertificates: { type: String },
    profilePhoto: { type: String }
  }
});

// Change collection name to 'users' to match actual collection
module.exports = mongoose.model('User', userSchema, 'users');
