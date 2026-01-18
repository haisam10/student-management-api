require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (for uploaded documents)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

/**
 * Root route
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Student Management API is running',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile (Protected)',
        deleteUser: 'DELETE /api/auth/:id (Admin)',
      },
      students: {
        getAll: 'GET /api/students',
        getById: 'GET /api/students/:id',
        search: 'GET /api/students/search?name=value',
        create: 'POST /api/students',
        update: 'PUT /api/students/:id',
        updateStatus: 'PATCH /api/students/:id/status',
        upload: 'POST /api/students/:id/upload',
        deleteOne: 'DELETE /api/students/:id',
        deleteAll: 'DELETE /api/students (Admin)',
      },
    },
  });
});

/**
 * 404 Error Handler
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Multer error handling
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: 'File size exceeds 5MB limit',
    });
  }

  if (err.message && err.message.includes('Invalid file type')) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
