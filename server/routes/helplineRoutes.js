const express = require('express');
const router = express.Router();
const HelplineMessage = require('../Schema/ForHelpline'); // Import from models



// GET all Helpline messages
app.get("/helpline", async (req, res) => {
    try {
      const messages = await Helpline.find().sort({ createdAt: -1 }); // Sort newest first
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch messages", error: error.message });
    }
  });

// DELETE a Helpline message
router.delete('/:id', async (req, res) => {
    try {
      await HelplineMessage.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Message deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete message', error });
    }
  });
  
module.exports = router;
