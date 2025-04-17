const express = require('express');
const router = express.Router();
const Therapist = require('./models/therapist');

// Debug route for testing
router.get('/api/therapists', async (req, res) => {
  try {
    console.log("Fetching therapists...");
    const therapists = await Therapist.find();
    console.log("Therapists fetched successfully:", therapists);
    res.json(therapists);
  } catch (error) {
    console.error("Error fetching therapists:", error);
    res.status(500).json({ message: "Failed to fetch therapists", error: error.message });
  }
});

module.exports = router;
