const express = require('express');
const { body } = require('express-validator');
const plumberController = require('../controllers/plumberController');
const plumberProfileController = require('../controllers/plumberProfileController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules for plumber
const plumberSignupValidation = [
  body('plumber_username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Plumber username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Plumber username can only contain letters, numbers, and underscores'),
  body('plumber_email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid plumber email address'),
  body('plumber_password')
    .isLength({ min: 6 })
    .withMessage('Plumber password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Plumber password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('confirm_plumber_password')
    .custom((value, { req }) => {
      if (value !== req.body.plumber_password) {
        throw new Error('Plumber passwords do not match');
      }
      return true;
    })
];

const plumberLoginValidation = [
  body('plumber_email')
    .trim()
    .notEmpty()
    .withMessage('Plumber email or username is required'),
  body('plumber_password')
    .notEmpty()
    .withMessage('Plumber password is required')
];

const plumberForgotPasswordValidation = [
  body('plumber_email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid plumber email address')
];

const plumberVerifyOtpValidation = [
  body('plumber_email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid plumber email address'),
  body('otp')
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers')
];

const plumberResetPasswordValidation = [
  body('plumber_email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid plumber email address'),
  body('otp')
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers'),
  body('new_plumber_password')
    .isLength({ min: 6 })
    .withMessage('Plumber password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Plumber password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('confirm_plumber_password')
    .custom((value, { req }) => {
      if (value !== req.body.new_plumber_password) {
        throw new Error('Plumber passwords do not match');
      }
      return true;
    })
];

// Authentication Routes
router.post('/signup', plumberSignupValidation, validateRequest, plumberController.plumberSignup);
router.post('/login', plumberLoginValidation, validateRequest, plumberController.plumberLogin);
router.post('/forgot-password', plumberForgotPasswordValidation, validateRequest, plumberController.plumberForgotPassword);
router.post('/verify-otp', plumberVerifyOtpValidation, validateRequest, plumberController.plumberVerifyOtp);
router.post('/reset-password', plumberResetPasswordValidation, validateRequest, plumberController.plumberResetPassword);

// Profile Routes
router.get('/profile/:id?', plumberProfileController.getPlumberProfile);
router.put('/profile/:id?', plumberProfileController.updatePlumberProfile);

module.exports = router;
