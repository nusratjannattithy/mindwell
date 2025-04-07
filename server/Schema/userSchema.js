const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  educationalCertificates: { type: String, default: null },
  resume: { type: String, default: null },
  governmentID: { type: String, default: null },
  consentForm: { type: String, default: null },
  specializationCertificates: { type: String, default: null },
  profilePhoto: { type: String, default: null },
});

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },
    birthdate: { type: Date },
    specialization: { type: String },
    licenseNumber: { type: String },
    experience: { type: String },
    documents: { type: documentSchema },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);