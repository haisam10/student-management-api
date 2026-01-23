require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const connectDB = require("./db");
const Student = require("./models/Student");
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth");

connectDB();

app.use(express.json()); // 🔥 must
app.use(express.static(".")); // Serve static files including index.html

// ✅ CORS middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
});

// ✅ Authentication routes (no token required)
app.use("/api/auth", authRoutes);

// home route
app.get("/home", (req, res) => {
  res.send("Student Management API is running...");
});

// ✅ GET - all students (Protected - Admin only)
app.get("/students", verifyToken, isAdmin, async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// ✅ POST - add student (Protected - Admin only)
app.post("/students", verifyToken, isAdmin, async (req, res) => {
  try {
    const { studentId, name, dept, section, batch } = req.body;

    if (!studentId || !name || !dept || !section || !batch) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = new Student({ studentId, name, dept, section, batch });
    await student.save();

    res.status(201).json(student);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Student ID already exists" });
    }
    res.status(500).json({ message: "Error adding student" });
  }
});

// ✅ PUT - update student by ID (Protected - Admin only)
app.put("/students/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const { studentId, name, dept, section, batch } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { studentId, name, dept, section, batch },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID or data" });
  }
});

// ✅ DELETE - delete student by ID (Protected - Admin only)
app.delete("/students/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      message: "Student deleted successfully",
      deletedStudent: student,
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// ✅ PATCH - partial update student by ID (Protected - Admin only)
app.patch("/students/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updates = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Invalid ID or data" });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
