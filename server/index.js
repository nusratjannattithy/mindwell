require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');

// Import the User model from models/registered.js
const User = require('./models/registered.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection (Connected to "Mindwell" database)
mongoose.connect("mongodb://127.0.0.1:27017/Mindwell").then(() => console.log('MongoDB Connected to "Mindwell" database'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Multer Storage (for file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API Route: User Registration
app.post('/register', upload.fields([
    { name: 'educationalCertificates' },
    { name: 'resume' },
    { name: 'governmentID' },
    { name: 'consentForm' },
    { name: 'specializationCertificates' },
    { name: 'profilePhoto' }
]), async (req, res) => {
    try {
        const { fullName, email, password, phone, userType, gender, birthdate, specialization, licenseNumber, experience } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // Create and save new user
        const newUser = new User({
            fullName, email, password, phone, userType, gender, birthdate, specialization, licenseNumber, experience,
            documents: {
                educationalCertificates: req.files['educationalCertificates'] ? req.files['educationalCertificates'][0].originalname : null,
                resume: req.files['resume'] ? req.files['resume'][0].originalname : null,
                governmentID: req.files['governmentID'] ? req.files['governmentID'][0].originalname : null,
                consentForm: req.files['consentForm'] ? req.files['consentForm'][0].originalname : null,
                specializationCertificates: req.files['specializationCertificates'] ? req.files['specializationCertificates'][0].originalname : null,
                profilePhoto: req.files['profilePhoto'] ? req.files['profilePhoto'][0].originalname : null,
            }
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!", user: newUser });

    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});

// Start Server with Port Handling
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle Port In Use Error
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is in use, trying another port...`);
        const net = require('net');
        const newServer = net.createServer();

        newServer.listen(0, () => {
            const newPort = newServer.address().port;
            newServer.close(() => {
                app.listen(newPort, () => {
                    console.log(`Server running on free port ${newPort}`);
                });
            });
        });
    } else {
        console.error('Server error:', err);
    }
});
