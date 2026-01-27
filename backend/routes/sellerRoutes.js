const express = require('express');
const { body } = require('express-validator');
const sellerController = require('../controllers/sellerController');
const sellerProfileController = require('../controllers/sellerProfileController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules for seller
const sellerSignupValidation = [
  body('seller_username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Seller username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Seller username can only contain letters, numbers, and underscores'),
  body('seller_email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid seller email address'),
  body('seller_password')
    .isLength({ min: 6 })
    .withMessage('Seller password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Seller password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('confirm_seller_password')
    .custom((value, { req }) => {
      if (value !== req.body.seller_password) {
        throw new Error('Seller passwords do not match');
      }
      return true;
    })
];

const sellerLoginValidation = [
  body('seller_email')
    .trim()
    .notEmpty()
    .withMessage('Seller email or username is required'),
  body('seller_password')
    .notEmpty()
    .withMessage('Seller password is required')
];

const sellerForgotPasswordValidation = [
  body('seller_email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid seller email address')
];

const sellerVerifyOtpValidation = [
  body('seller_email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid seller email address'),
  body('otp')
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers')
];

const sellerResetPasswordValidation = [
  body('seller_email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid seller email address'),
  body('otp')
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be 6 digits')
    .isNumeric()
    .withMessage('OTP must contain only numbers'),
  body('new_seller_password')
    .isLength({ min: 6 })
    .withMessage('Seller password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Seller password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('confirm_seller_password')
    .custom((value, { req }) => {
      if (value !== req.body.new_seller_password) {
        throw new Error('Seller passwords do not match');
      }
      return true;
    })
];

// Authentication Routes
router.post('/signup', sellerSignupValidation, validateRequest, sellerController.sellerSignup);
router.post('/login', sellerLoginValidation, validateRequest, sellerController.sellerLogin);
router.post('/forgot-password', sellerForgotPasswordValidation, validateRequest, sellerController.sellerForgotPassword);
router.post('/verify-otp', sellerVerifyOtpValidation, validateRequest, sellerController.sellerVerifyOtp);
router.post('/reset-password', sellerResetPasswordValidation, validateRequest, sellerController.sellerResetPassword);

// Profile Routes
router.get('/profile/:id?', sellerProfileController.getSellerProfile);
router.put('/profile/:id?', sellerProfileController.updateSellerProfile);

module.exports = router;
