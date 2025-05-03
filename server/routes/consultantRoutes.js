const express = require('express');
const router = express.Router();
const User = require('../models/registered'); // ✅ Using the correct User model from 'users' collection

const multer = require('multer');
const path = require('path');
//const Consultant = require('../models/registered');

// ✅ GET Consultant Profile by Email
router.get('/profile', async (req, res) => {
  try {
    const email = req.query.email;

    // ✅ Query from users collection and check userType is therapist
    const consultant = await User.findOne({ email, userType: 'therapist' });

    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    res.json(consultant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ PATCH Appointment Status (approve/reject)
router.patch('/appointment/:id', async (req, res) => {
  const { id } = req.params;
  const { email, status } = req.body;

  try {
    const consultant = await User.findOne({ email, userType: 'therapist' });

    if (!consultant) return res.status(404).json({ message: "Consultant not found" });

    const appointment = consultant.appointments.id(id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = status;
    await consultant.save();

    res.json({ message: `Appointment ${status}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update appointment" });
  }
});


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

    const updated = await Consultant.findOneAndUpdate(
      { email, userType: 'therapist' },
      { profilePhoto: url },
      { new: true }
    );

    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: 'Photo upload failed' });
  }
});




module.exports = router;