const express = require('express');
const { body } = require('express-validator');
const productController = require('../controllers/productController');
const { validateRequest } = require('../middleware/validation');

const router = express.Router();

// Validation rules
const createProductValidation = [
  body('product_name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 255 })
    .withMessage('Product name must be less than 255 characters'),
  body('product_description')
    .optional()
    .trim(),
  body('product_category')
    .trim()
    .notEmpty()
    .withMessage('Product category is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock_quantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be a non-negative integer'),
  body('sku')
    .optional()
    .trim()
];

// Routes
router.get('/', productController.getAllProducts);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);
router.post('/', createProductValidation, validateRequest, productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
