const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Extract token from Authorization header, body, or query parameters
  let token = req.headers['authorization'];

  // If the token is in the Authorization header, extract it
  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1]; // Extract the token part
  } else {
    // If the token is not in the Authorization header, check in body or query params
    token = req.body.bearerToken || req.query.bearerToken;
  }

  // If no token is found, return 401 error
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user to the request object, excluding the password
    req.user = await User.findById(decoded.user.id).select('-password');

    // If the user is not found, return 401 error
    if (!req.user) {
      return res.status(401).send('Access denied. User not found.');
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid, return 400 error
    res.status(400).send('Invalid token.');
  }
};
