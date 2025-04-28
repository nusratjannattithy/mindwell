const express = require("express");
const router = express.Router();
const User = require("../models/registered"); // same model, because consultants are also users

// GET all consultants
router.get("/", async (req, res) => {
  try {
    // Fetch users with userType "therapist" and exclude password
    const consultants = await User.find({ userType: "therapist" }, { password: 0 }); // Exclude password

    // Ensure all needed fields (name, email, specialization, etc.) are included
    res.json({ success: true, consultants });
  } catch (err) {
    console.error("Error fetching consultants:", err);
    res.status(500).json({ success: false, message: "Error fetching consultants." });
  }
});

// GET specific consultant by ID
router.get("/:id", async (req, res) => {
  try {
    // Fetch the specific consultant by ID and exclude password
    const consultant = await User.findById(req.params.id, { password: 0 });

    if (!consultant || consultant.userType !== "therapist") {
      return res.status(404).json({ success: false, message: "Consultant not found" });
    }

    // Send all the data of the consultant
    res.json({ success: true, consultant });
  } catch (err) {
    console.error("Error fetching consultant:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
