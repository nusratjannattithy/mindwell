import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import bcrypt from "bcryptjs"; // For password hashing

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File Upload Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./uploads/"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

// Define Schema
const UserSchema = new mongoose.Schema({
  userType: String,
  fullName: String,
  email: String,
  password: String,
  phone: String,
  gender: String,
  birthdate: String,
  specialization: String,
  licenseNumber: String,
  experience: String,
  documents: {
    educationalCertificates: String,
    resume: String,
    governmentID: String,
    consentForm: String,
    specializationCertificates: String,
    profilePhoto: String,
  },
});

const User = mongoose.model("User", UserSchema);

// API Endpoint for Registration
app.post("/api/register", upload.fields([
  { name: "educationalCertificates" },
  { name: "resume" },
  { name: "governmentID" },
  { name: "consentForm" },
  { name: "specializationCertificates" },
  { name: "profilePhoto" }
]), async (req, res) => {
  try {
    const { userType, fullName, email, password, phone, gender, birthdate, specialization, licenseNumber, experience } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle document uploads
    const documents = {
      educationalCertificates: req.files["educationalCertificates"] ? req.files["educationalCertificates"][0].path : null,
      resume: req.files["resume"] ? req.files["resume"][0].path : null,
      governmentID: req.files["governmentID"] ? req.files["governmentID"][0].path : null,
      consentForm: req.files["consentForm"] ? req.files["consentForm"][0].path : null,
      specializationCertificates: req.files["specializationCertificates"] ? req.files["specializationCertificates"][0].path : null,
      profilePhoto: req.files["profilePhoto"] ? req.files["profilePhoto"][0].path : null,
    };

    // Create a new user instance with hashed password
    const newUser = new User({ 
      userType, 
      fullName, 
      email, 
      password: hashedPassword, 
      phone, 
      gender, 
      birthdate, 
      specialization, 
      licenseNumber, 
      experience, 
      documents 
    });

    await newUser.save();
    res.json({ message: "Registration successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed!" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
app.get("/", (req, res) => {
    res.send("API is running...");
  });
  