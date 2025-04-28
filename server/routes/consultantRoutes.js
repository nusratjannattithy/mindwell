const express = require('express');
const router = express.Router();
const User = require('../models/registered'); // users collection
const Appointment = require('../models/appointment'); // appointments collection
const multer = require('multer');
const path = require('path');

// ✅ GET Consultant Profile by Email
router.get('/profile', async (req, res) => {
  try {
    const email = req.query.email;
    const consultant = await User.findOne({ email, userType: 'therapist' });

    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    res.json(consultant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PUT Update Consultant Profile Info
router.put('/profile', async (req, res) => {
  try {
    const { email, updateData } = req.body;

    const updatedConsultant = await User.findOneAndUpdate(
      { email, userType: 'therapist' },
      { $set: updateData },
      { new: true }
    );

    if (!updatedConsultant) return res.status(404).json({ message: "Consultant not found" });

    res.json(updatedConsultant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// ✅ GET Appointments for the Consultant
router.get('/appointments/:consultantId', async (req, res) => {
  try {
    const { consultantId } = req.params;

    const appointments = await Appointment.find({ consultantId });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ PATCH Appointment Status (approve/reject)

router.patch('/appointment/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await appointment.save();

    res.json({ message: `Appointment ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update appointment" });
  }
});

// ✅ Upload Profile Photo (using multer)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/upload-photo', upload.single('profilePhoto'), async (req, res) => {
  try {
    const { email } = req.body;
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const updated = await User.findOneAndUpdate(
      { email, userType: 'therapist' },
      { $set: { 'documents.profilePhoto': url } },
      { new: true }
    );

    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: 'Photo upload failed' });
  }
});

module.exports = router;
