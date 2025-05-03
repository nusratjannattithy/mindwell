const express = require('express');
const router = express.Router();
const SessionNote = require('../models/SessionNote');
const Appointment = require('../models/Appointment');

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

// POST route to add a new session note
router.post('/:id/session-notes', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { note, patientEmail } = req.body;
    const newSessionNote = new SessionNote({
      appointmentId,
      patientEmail,
      note,
    });
    await newSessionNote.save();
    res.status(201).json({ message: 'Session note saved successfully', sessionNote: newSessionNote });
  } catch (error) {
    console.error('Error saving session note:', error);
    res.status(500).json({ message: 'Error saving session note' });
  }
});

// GET route to fetch session notes for an appointment
router.get('/:id/session-notes', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const sessionNotes = await SessionNote.find({ appointmentId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, sessionNotes });
  } catch (error) {
    console.error('Error fetching session notes:', error);
    res.status(500).json({ success: false, message: 'Error fetching session notes' });
  }
});

// PATCH route to update session notes for an appointment by ID (deprecated, no longer updates remarks)
router.patch('/:id/session-notes', async (req, res) => {
  res.status(400).json({ message: 'Updating session notes via appointment remarks is deprecated. Use POST to add new session notes.' });
});

// DELETE route to delete a session note by ID
router.delete('/session-notes/:id', async (req, res) => {
  try {
    const sessionNoteId = req.params.id;
    const deletedNote = await SessionNote.findByIdAndDelete(sessionNoteId);
    if (!deletedNote) {
      return res.status(404).json({ message: 'Session note not found' });
    }
    res.status(200).json({ message: 'Session note deleted successfully' });
  } catch (error) {
    console.error('Error deleting session note:', error);
    res.status(500).json({ message: 'Error deleting session note' });
  }
});

const Consultant = require('../models/Consultant');

// GET route to fetch all appointments for a patient by email with consultant name
router.get('/:email', async (req, res) => {
  try {
    const email = req.params.email;
    // Aggregate appointments with consultant fullName lookup
    const appointments = await Appointment.aggregate([
      { $match: { email } },
      {
        $lookup: {
          from: 'users',
          localField: 'consultantId',
          foreignField: '_id',
          as: 'consultantInfo'
        }
      },
      {
        $unwind: {
          path: '$consultantInfo',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          consultantName: '$consultantInfo.fullName'
        }
      },
      {
        $project: {
          consultantInfo: 0
        }
      }
    ]);
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Error fetching appointments' });
  }
});

module.exports = router;
