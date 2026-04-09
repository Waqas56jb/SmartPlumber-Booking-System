const express = require('express');
const {
  body,
  validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authController');
const {
  validateRequest
} = require('../middleware/validation');
const router = express.Router();
// i keep auth rules next to routes so controllers stay thin
const signupValidation = [body('username').trim().isLength({
  min: 3,
  max: 30
}).withMessage('Username must be between 3 and 30 characters').matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores'), body('email').trim().isEmail().normalizeEmail().withMessage('Please provide a valid email address'), body('password').isLength({
  min: 6
}).withMessage('Password must be at least 6 characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'), body('confirmPassword').custom((value, {
  req
}) => {
  if (value !== req.body.password) {
    throw new Error('Passwords do not match');
  }
  return true;
})];
const loginValidation = [body('email').trim().isEmail().normalizeEmail().withMessage('Please provide a valid email address'), body('password').notEmpty().withMessage('Password is required')];
const forgotPasswordValidation = [body('email').trim().isEmail().normalizeEmail().withMessage('Please provide a valid email address')];
const verifyOtpValidation = [body('email').trim().isEmail().normalizeEmail().withMessage('Please provide a valid email address'), body('otp').trim().isLength({
  min: 6,
  max: 6
}).withMessage('OTP must be 6 digits').isNumeric().withMessage('OTP must contain only numbers')];
const resetPasswordValidation = [body('email').trim().isEmail().normalizeEmail().withMessage('Please provide a valid email address'), body('otp').trim().isLength({
  min: 6,
  max: 6
}).withMessage('OTP must be 6 digits').isNumeric().withMessage('OTP must contain only numbers'), body('newPassword').isLength({
  min: 6
}).withMessage('Password must be at least 6 characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'), body('confirmPassword').custom((value, {
  req
}) => {
  if (value !== req.body.newPassword) {
    throw new Error('Passwords do not match');
  }
  return true;
})];
// i chain validator then controller on each customer auth endpoint
router.post('/signup', signupValidation, validateRequest, authController.signup);
router.post('/login', loginValidation, validateRequest, authController.login);
router.post('/forgot-password', forgotPasswordValidation, validateRequest, authController.forgotPassword);
router.post('/verify-otp', verifyOtpValidation, validateRequest, authController.verifyOtp);
router.post('/reset-password', resetPasswordValidation, validateRequest, authController.resetPassword);
module.exports = router;
