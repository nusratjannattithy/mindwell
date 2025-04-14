const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { connectDB, getDB } = require("./db");

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

const documentsFields = upload.fields([
  { name: "educationalCertificates" },
  { name: "resume" },
  { name: "governmentID" },
  { name: "consentForm" },
  { name: "specializationCertificates" },
  { name: "profilePhoto" },
]);
app.post("/registration", documentsFields, async (req, res, next) => {
  try {
    const db = getDB(); // Ensure DB is initialized
    const usersCollection = db.collection("users");

    const formFields = req.body;
    const uploadedFiles = req.files;

    const fileBaseURL = `${process.env.BASE_URL}/uploads/`; // *** the url must change when it is in production *** //
    const fileURLs = {};

    for (let key in uploadedFiles) {
      if (uploadedFiles[key]) {
        fileURLs[key] = fileBaseURL + uploadedFiles[key][0].filename;
      }
    }

    const userData = {
      ...formFields,
      documents: { ...fileURLs },
    };

    await usersCollection.insertOne(userData);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log("Server is live at http://localhost:${PORT}");
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();