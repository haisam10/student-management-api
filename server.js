const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dv'); // Import MongoDB connection
const Student = require('./models/Student');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB before starting server
connectDB().then(() => {
  app.listen(port, () => {
    console.log( 'Server running at http://localhost:${port}')
    ;});
}).catch(err => {
  console.error('❌ Failed to connect to DB:', err);
});

// Routes
app.get('/', (req, res) => res.send('<h1>Express Server Running 🚀</h1>'));
app.get('/about', (req, res) => res.send('<h1>This is About Page</h1>'));
app.get('/contact', (req, res) => res.send('<h1>This is Contact Page</h1>'));
app.get('/phone', (req, res) => res.send('<h1>Hello, Express.js Server!</h1>'));

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get student by ID
app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Get student by name
app.get('/students/name/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const student = await Student.findOne({
      name: { $regex: new RegExp('^${name}$', 'i') }
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Add new student
app.post('/students', async (req, res) => {
  try {
    const { name, dept } = req.body;
    const student = new Student({ name, dept });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});