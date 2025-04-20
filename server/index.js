const express = require("express");
const cors = require("cors");
const multer = require("multer");



const { connectDB, getDB } = require("./db");

const User = require("./models/registered");

const Feedback = require("./Schema/Feedback");
const MoodTracking = require("./models/moodTracking");
const { Collection } = require("mongodb");


require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Set up multer for file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
app.get("/", (req, res) => {
  res.send("MindWell API is running...");
});

// Helpline message endpoint
app.post("/helpline", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const db = getDB();
    const helplineCollection = db.collection("Helpline");

    const result = await helplineCollection.insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date()
    });

    if (result.insertedId) {
      res.status(201).json({ 
        success: true,
        message: "Your message has been sent successfully" 
      });
    } else {
      throw new Error("Failed to insert message");
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Feedback endpoints
app.post('/feedback', async (req, res) => {
  try {
    const { name, category, message } = req.body;
    const db = getDB();
    const feedbackCollection = db.collection("Feedback");

    const result = await feedbackCollection.insertOne({
      name,
      category,
      message,
      createdAt: new Date()
    });

    if (result.insertedId) {
      res.status(201).json({ 
        success: true,
        message: "Feedback submitted successfully" 
      });
    } else {
      throw new Error("Failed to insert feedback");
    }
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit feedback"
    });
  }
});

app.get('/feedback', async (req, res) => {
  try {
    console.log("Attempting to fetch feedback...");
    const db = getDB();
    if (!db) {
      console.error("Database connection not established");
      return res.status(500).json({ success: false, message: "Database connection error" });
    }
    
    const feedbackCollection = db.collection("Feedback");
    console.log("Feedback collection:", feedbackCollection);
    
    const feedbackList = await feedbackCollection.find().toArray();
    console.log("Fetched feedback:", feedbackList.length, "items");

    res.status(200).json({
      success: true,
      feedback: feedbackList
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch feedback"
    });
  }
});

app.post("/moodtracking", async (req, res) => {
  try {
    const { userId, mood, distraction, result } = req.body;
    if (mood === undefined || distraction === undefined || !result) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const moodEntry = new MoodTracking({
      userId,
      mood,
      distraction,
      result,
    });

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
    console.error("Error fetching mood tracking data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const documentsFields = upload.fields([
  { name: "educationalCertificates" },
  { name: "resume" },
  { name: "governmentID" },
  { name: "consentForm" },
  { name: "specializationCertificates" },
  { name: "profilePhoto" },
]);

app.post("/registration", documentsFields, async (req, res) => {
  try {
    const db = getDB();
    const usersCollection = db.collection("users");

    const formFields = req.body;
    const uploadedFiles = req.files;

    const fileBaseURL = `${process.env.BASE_URL}/uploads/`;
    const fileURLs = {};

    for (let key in uploadedFiles) {
      if (uploadedFiles[key]) {
        fileURLs[key] = fileBaseURL + uploadedFiles[key][0].filename;
      }
    }

    // Store password as plain text (not recommended)
    const userData = {
      ...formFields,
      password: formFields.password,
      documents: { ...fileURLs },
    };

    await usersCollection.insertOne(userData);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//user login

app.post("/login", async (req, res) => {
  const { email, password, userType } = req.body;

  if (!email || !password || !userType) {
    return res.status(400).json({
      message: "Please provide email, password, and user type",
    });
  }

  try {
    const db = getDB();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.confirmPassword !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (user.userType !== userType) {
      return res.status(403).json({ message: "Invalid user type" });
    }

    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});
// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is live at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
