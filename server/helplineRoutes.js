const express = require('express');
const router = express.Router();
const Helpline = require('./Schema/ForHelpline'); // Import the Helpline schema

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = new Helpline({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: "Your message has been sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Helpline.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error: error.message });
  }
});

module.exports = router;
