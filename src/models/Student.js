const mongoose = require('mongoose');

/**
 * Student Schema for storing student information
 */
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    rollNumber: {
      type: String,
      required: [true, 'Please provide roll number'],
      unique: true,
      trim: true,
    },
    courseEnrolled: {
      type: String,
      required: [true, 'Please provide course'],
      trim: true,
    },
    gpa: {
      type: Number,
      default: 0,
      min: 0,
      max: 4,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    documentUrl: {
      type: String,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
