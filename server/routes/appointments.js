const express = require('express');
const router = express.Router();

const Appointment = require('../models/appointment');

// POST route to save appointment
router.post('/', async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment saved successfully' });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ message: 'Error saving appointment' });
  }
});

module.exports = router;
