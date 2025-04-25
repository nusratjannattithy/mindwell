const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { connectDB, getDB } = require("./db");
const Feedback = require("./Schema/Feedback");
const MoodTracking = require("./models/moodTracking");
const selfTestRoutes = require("./routes/selftest");
const { Collection } = require("mongodb");

require("dotenv").config(); // Load environment variables from .env file
const User = require("./models/registered");

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

// Documents for reg
const documentsFields = upload.fields([
  { name: "educationalCertificates", maxCount: 1 },
  { name: "resume", maxCount: 1 },
  { name: "governmentID", maxCount: 1 },
  { name: "consentForm", maxCount: 1 },
  { name: "specializationCertificates", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);


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
      createdAt: new Date(),
    });

    if (result.insertedId) {
      res.status(201).json({
        success: true,
        message: "Your message has been sent successfully",
      });
    } else {
      throw new Error("Failed to insert message");
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Feedback endpoints
app.post("/feedback", async (req, res) => {
  try {
    const { name, category, message } = req.body;
    const db = getDB();
    const feedbackCollection = db.collection("Feedback");

    const result = await feedbackCollection.insertOne({
      name,
      category,
      message,
      createdAt: new Date(),
    });

    if (result.insertedId) {
      res.status(201).json({
        success: true,
        message: "Feedback submitted successfully",
      });
    } else {
      throw new Error("Failed to insert feedback");
    }
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to submit feedback",
    });
  }
});

app.get("/feedback", async (req, res) => {
  try {
    console.log("Attempting to fetch feedback...");
    const db = getDB();
    if (!db) {
      console.error("Database connection not established");
      return res
        .status(500)
        .json({ success: false, message: "Database connection error" });
    }

    const feedbackCollection = db.collection("Feedback");
    console.log("Feedback collection:", feedbackCollection);

    const feedbackList = await feedbackCollection.find().toArray();
    console.log("Fetched feedback:", feedbackList.length, "items");

    res.status(200).json({
      success: true,
      feedback: feedbackList,
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch feedback",
    });
  }
});

// Mood tracking
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
    const entries = await MoodTracking.find()
      .sort({ recordedAt: -1 })
      .limit(20);
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching mood tracking data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// registration code

app.post("/registration", documentsFields, async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const db = getDB();
    if (!db) {
      return res.status(500).json({ message: "Database connection failed" });
    }

    const usersCollection = db.collection("users");

    const formFields = req.body;
    const uploadedFiles = req.files;

    const fileBaseURL = `${process.env.BASE_URL}/uploads/`;
    const fileURLs = {};
    const hashedPassword = await bcrypt.hash(formFields.password, 10); // 10 is the salt rounds

    for (let key in uploadedFiles) {
      if (uploadedFiles[key]) {
        fileURLs[key] = fileBaseURL + uploadedFiles[key][0].filename;
      }
    }

    // Log the user data for debugging
    const userData = {
      ...formFields,
      userType: formFields.userType,
      password: hashedPassword, // Consider hashing the password
      documents: { ...fileURLs },
    };

    console.log("User Data:", userData); // Log user data to check

    await usersCollection.insertOne(userData);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { userType, email, password } = req.body;

    if (!userType || !email || !password) {
      return res.status(400).json({
        message: "Please provide email, password, and user type",
      });
    }

    // Use Mongoose to find the user
    const user = await User.findOne({ email, userType });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Match the plain password (consider hashing in production)
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Remove sensitive data before returning
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      user: userData,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

//Admin Components Routes 
const userRoutes = require("./routes/userRoutes"); //user (patient)
app.use("/users", userRoutes);


// Start server
const startServer = async () => {
  try {
    // Ensure we are connecting to MongoDB using the environment variable MONGODB_URI
    const mongoUri = process.env.MONGODB_URI; // Get MongoDB URI from environment variable
    if (!mongoUri) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables."
      );
    }

    console.log("MongoDB URI:", mongoUri);

    // Connect to MongoDB using Mongoose
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose connected to MongoDB");
    await connectDB();
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is live at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
