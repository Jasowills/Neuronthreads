const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Signup Controller
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstname, lastname, username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user
    user = new User({
      firstname,
      lastname,
      username,
      email,
      password,
  
    });

    // Save the user to the database
    await user.save();

    // Create a JWT token
    const payload = {
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload.user });
    });
  } catch (err) {
    console.error('Error in signup:', err.message);
    res.status(500).send('Server error');
  }
};

// Login Controller
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a JWT token
    const payload = {
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: payload.user });
    });
  } catch (err) {
    console.error('Error in login:', err.message);
    res.status(500).send('Server error');
  }
};
