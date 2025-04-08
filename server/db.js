// db.js
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mindwell.7b4fdp5.mongodb.net/?retryWrites=true&w=majority&appName=mindwell`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("mindwell");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

function getDB() {
  if (!db) {
    throw new Error("DB not initialized. Call connectDB() first.");
  }
  return db;
}

module.exports = { connectDB, getDB };