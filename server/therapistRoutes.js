const express = require('express');
const router = express.Router();
const User = require('./Schema/userSchema');  // Correct import from schema

// Route to get all therapists
router.get('/therapists', async (req, res) => {
  try {
    const therapists = await User.find({
      userType: { $regex: /^(psychologist|therapist)$/i }
    });
    res.json(therapists);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch therapists", error: error.message });
  }
});

// Route to get therapist by ID
router.get('/therapists/:id', async (req, res) => {
  try {
    const therapist = await User.findOne({
      _id: req.params.id,
      userType: { $regex: /^(psychologist|therapist)$/i }
    });

    if (!therapist) {
      return res.status(404).json({ message: "Therapist not found" });
    }

    res.json(therapist);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch therapist", error: error.message });
  }
});

module.exports = router;
