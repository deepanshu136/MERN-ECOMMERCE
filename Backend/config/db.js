const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to db");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

module.exports = connectDB;
