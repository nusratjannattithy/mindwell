const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/.env' });
const Therapist = require('./models/therapist');

const mongoUri = process.env.MONGODB_URI;

async function checkCount() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const count = await Therapist.countDocuments();
    console.log('Number of therapists in DB:', count);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error checking therapists count:', error);
  }
}

checkCount();
