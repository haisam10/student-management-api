const Student = require('../models/Student');

/**
 * @desc    Get all students
 * @route   GET /api/students
 * @access  Private
 */
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: students,
      count: students.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Get student by ID
 * @route   GET /api/students/:id
 * @access  Private
 */
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id).populate(
      'createdBy',
      'name email'
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student retrieved successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Create a new student
 * @route   POST /api/students
 * @access  Private
 */
exports.createStudent = async (req, res) => {
  try {
    const { name, email, rollNumber, courseEnrolled, gpa, phoneNumber, address } = req.body;

    // Check if email already exists
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists',
      });
    }

    // Check if roll number already exists
    const rollExists = await Student.findOne({ rollNumber });
    if (rollExists) {
      return res.status(400).json({
        success: false,
        message: 'Student with this roll number already exists',
      });
    }

    const student = await Student.create({
      name,
      email,
      rollNumber,
      courseEnrolled,
      gpa: gpa || 0,
      phoneNumber: phoneNumber || '',
      address: address || '',
      createdBy: req.user.id,
    });

    await student.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update student by ID
 * @route   PUT /api/students/:id
 * @access  Private
 */
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if trying to update email - ensure it's not duplicate
    if (updates.email) {
      const emailExists = await Student.findOne({
        email: updates.email,
        _id: { $ne: id },
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use',
        });
      }
    }

    // Check if trying to update roll number - ensure it's not duplicate
    if (updates.rollNumber) {
      const rollExists = await Student.findOne({
        rollNumber: updates.rollNumber,
        _id: { $ne: id },
      });
      if (rollExists) {
        return res.status(400).json({
          success: false,
          message: 'Roll number already in use',
        });
      }
    }

    const student = await Student.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).populate('createdBy', 'name email');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Update student status
 * @route   PATCH /api/students/:id/status
 * @access  Private
 */
exports.updateStudentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['active', 'inactive', 'suspended'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    ).populate('createdBy', 'name email');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student status updated successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete student by ID
 * @route   DELETE /api/students/:id
 * @access  Private
 */
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete all students (Admin only)
 * @route   DELETE /api/students
 * @access  Private/Admin
 */
exports.deleteAllStudents = async (req, res) => {
  try {
    const result = await Student.deleteMany({});

    res.status(200).json({
      success: true,
      message: 'All students deleted successfully',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Search students by name
 * @route   GET /api/students/search?name=value
 * @access  Private
 */
exports.searchStudents = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Name parameter is required',
      });
    }

    // Case-insensitive partial match
    const students = await Student.find({
      name: { $regex: name, $options: 'i' },
    }).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Search results retrieved successfully',
      data: students,
      count: students.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Upload document for a student
 * @route   POST /api/students/:id/upload
 * @access  Private
 */
exports.uploadStudentDocument = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { documentUrl: `/uploads/${req.file.filename}` },
      {
        new: true,
        runValidators: true,
      }
    ).populate('createdBy', 'name email');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Document uploaded successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
