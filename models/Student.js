// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    enum: ["CSE", "BBA", "GDM"],
    required: true,
  },
  section: {
    type: String,
    enum: ["A", "B", "C", "D"],
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", studentSchema);

