// routes/products.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', [
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric(),
    check('category', 'Category is required').not().isEmpty(),
  ]
], productController.createProduct);

router.put('/:id', [
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'Price must be a number').isNumeric(),
    check('category', 'Category is required').not().isEmpty(),
  ]
], productController.updateProduct);

router.delete('/:id', auth, productController.deleteProduct);

module.exports = router;
