require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb+srv://admin:admin@cluster0.xhczywn.mongodb.net/studentDB",
      {
        serverSelectionTimeoutMS: 5000,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
