const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Therapist = require('./models/therapist');

const mongoUri = process.env.MONGODB_URI;

const sampleTherapists = [
  {
    fullName: "Dr. Jane Doe",
    specialization: "Clinical Psychology",
    experience: 10,
    userType: "therapist",
    documents: {
      profilePhoto: "https://example.com/images/jane_doe.jpg"
    }
  },
  {
    fullName: "Dr. John Smith",
    specialization: "Counseling",
    experience: 8,
    userType: "therapist",
    documents: {
      profilePhoto: "https://example.com/images/john_smith.jpg"
    }
  },
  {
    fullName: "Dr. Emily Johnson",
    specialization: "Child Psychology",
    experience: 5,
    userType: "therapist",
    documents: {
      profilePhoto: "https://example.com/images/emily_johnson.jpg"
    }
  }
];

async function seedTherapists() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await Therapist.deleteMany({});
    await Therapist.insertMany(sampleTherapists);
    console.log("Sample therapists inserted successfully.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding therapists:", error);
  }
}

seedTherapists();
