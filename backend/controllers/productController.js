// controllers/productController.js
const Product = require('../models/Products');
const { validationResult } = require('express-validator');

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err.message);

    // Check for an invalid ObjectId (e.g., malformed ObjectId)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Product not found' });
    }

    res.status(500).send('Server error');
  }
};

// Create Product
exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, price, imageURL, category } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      imageURL,
      category,
      createdBy: req.user.id
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const { name, description, price, imageURL, category } = req.body;

  const updatedProduct = {
    name,
    description,
    price,
    imageURL,
    category,
  };

  try {
    let product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'Product not found' });

    // Check if user owns the product
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    product = await Product.findByIdAndUpdate(req.params.id, { $set: updatedProduct }, { new: true });

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    // Check if user owns the product
    if (product.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Product removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
