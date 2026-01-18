const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');
const {
  validateStudent,
  handleValidationErrors,
} = require('../middleware/validation');
const upload = require('../utils/multer');

/**
 * @route   GET /api/students
 * @desc    Get all students
 * @access  Private
 */
router.get('/', authMiddleware, studentController.getAllStudents);

/**
 * @route   GET /api/students/search
 * @desc    Search students by name
 * @access  Private
 */
router.get('/search', authMiddleware, studentController.searchStudents);

/**
 * @route   GET /api/students/:id
 * @desc    Get student by ID
 * @access  Private
 */
router.get('/:id', authMiddleware, studentController.getStudentById);

/**
 * @route   POST /api/students
 * @desc    Create a new student
 * @access  Private
 */
router.post(
  '/',
  authMiddleware,
  validateStudent,
  handleValidationErrors,
  studentController.createStudent
);

/**
 * @route   PUT /api/students/:id
 * @desc    Update student by ID
 * @access  Private
 */
router.put('/:id', authMiddleware, studentController.updateStudent);

/**
 * @route   PATCH /api/students/:id/status
 * @desc    Update student status
 * @access  Private
 */
router.patch('/:id/status', authMiddleware, studentController.updateStudentStatus);

/**
 * @route   DELETE /api/students/:id
 * @desc    Delete student by ID
 * @access  Private
 */
router.delete('/:id', authMiddleware, studentController.deleteStudent);

/**
 * @route   DELETE /api/students
 * @desc    Delete all students
 * @access  Private/Admin
 */
router.delete('/', authMiddleware, adminMiddleware, studentController.deleteAllStudents);

/**
 * @route   POST /api/students/:id/upload
 * @desc    Upload document for a student
 * @access  Private
 */
router.post(
  '/:id/upload',
  authMiddleware,
  upload.single('document'),
  studentController.uploadStudentDocument
);

module.exports = router;
