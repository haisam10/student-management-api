const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', validateRegister, handleValidationErrors, authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', validateLogin, handleValidationErrors, authController.login);

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', authMiddleware, authController.getProfile);

/**
 * @route   DELETE /api/auth/:id
 * @desc    Delete a user (Admin only)
 * @access  Private/Admin
 */
router.delete('/:id', authMiddleware, adminMiddleware, authController.deleteUser);

module.exports = router;
