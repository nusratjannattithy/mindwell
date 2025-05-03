const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
const dotenv = require("dotenv");


require("dotenv").config(); // Load environment variables from .env file
const { connectDB, getDB } = require("./db");
const User = require("./models/registered");

console.log("Loading environment variables...");
dotenv.config(); // Load environment variables from .env file

console.log("MONGODB_URI:", process.env.MONGODB_URI);


const Feedback = require("./Schema/Feedback");
const MoodTracking = require("./models/moodTracking");
const selfTestRoutes = require("./routes/selftest");
const consultantRoutes = require("./routes/consultantRoutes");
const { Collection } = require("mongodb");
const appointmentRoutes = require('./routes/appointments');  // Import appointment routes

const therapistRoutes = require('./therapistRoutes');  // Import therapist routes

const app = express();
const PORT = process.env.PORT || 5000;

// === Middleware ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Use therapist routes under '/api'
app.use('/api', therapistRoutes);

// === Multer File Upload Config ===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

const documentsFields = upload.fields([
  { name: "educationalCertificates", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "governmentID", maxCount: 1 },
  { name: "consentForm", maxCount: 1 },
  { name: "specializationCertificates", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);

// === Routes ===
app.get("/", (req, res) => {
  res.send("MindWell API is running...");
});

// Helpline Message Route
const Helpline = mongoose.model("Helpline", new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
}));

app.post("/helpline", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = new Helpline({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: "Your message has been sent successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Feedback Routes
app.post("/feedback", async (req, res) => {
  try {
    const { name, category, message } = req.body;
    const feedback = new Feedback({ name, category, message });
    await feedback.save();
    res.status(201).json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/feedback", async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, feedback: feedbackList });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/moodtracking", async (req, res) => {
  try {
    const { userId, mood, distraction, result } = req.body;
    if (mood === undefined || distraction === undefined || !result) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const moodEntry = new MoodTracking({ userId, mood, distraction, result });
    await moodEntry.save();

    res.status(201).json({ message: "Mood tracking data saved successfully" });
  } catch (error) {
    console.error("Error saving mood tracking data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/moodtracking", async (req, res) => {
  try {
    const entries = await MoodTracking.find().sort({ recordedAt: -1 }).limit(20);
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Registration with File Uploads & Hashing
app.post("/registration", documentsFields, async (req, res) => {
  try {
    const formFields = req.body;
    const uploadedFiles = req.files;
    const fileBaseURL = `${process.env.BASE_URL}/uploads/`;

    const fileURLs = {};
    for (let key in uploadedFiles) {
      if (uploadedFiles[key]) {
        fileURLs[key] = fileBaseURL + uploadedFiles[key][0].filename;
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formFields.password, salt);

    // Validate gender field before saving
    const validGenders = ['male', 'female', 'other'];
    if (!validGenders.includes(formFields.gender)) {
      delete formFields.gender;
    }

    // Validate phone presence only if userType is patient
    if (formFields.userType === 'patient' && !formFields.phone) {
      return res.status(400).json({ message: "Phone number is required for patient registration" });
    }

    // Normalize and validate userType
    const validUserTypes = ['patient', 'therapist', 'admin'];
    if (!formFields.userType) {
      return res.status(400).json({ message: "User type is required" });
    }
    formFields.userType = formFields.userType.toLowerCase().trim();
    if (!validUserTypes.includes(formFields.userType)) {
      return res.status(400).json({ message: `Invalid user type. Allowed values: ${validUserTypes.join(', ')}` });
    }

    const userData = {
      ...formFields,
      password: hashedPassword,
      documents: fileURLs,
    };

    console.log("User Data:", userData); // Log user data to check

    await User.create(userData);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { userType, email, password } = req.body;

    if (!userType || !email || !password) {
      return res.status(400).json({ message: "Please provide email, password, and user type" });
    }

    const user = await User.findOne({ email, userType });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const { password: _, ...userData } = user.toObject(); // remove password from response
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
//Admin Components Routes 
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);

// === Additional Routes ===
app.use("/consultant", consultantRoutes);
app.use("/api/selftest", selfTestRoutes);
app.use('/api/appointments', appointmentRoutes);
// === Start Server ===
const startServer = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) throw new Error("MongoDB URI is not defined in environment variables.");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is live at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
